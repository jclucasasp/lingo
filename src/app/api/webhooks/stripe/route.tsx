import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { userSubscription } from "@/../../db/schema";
import { and, eq } from "drizzle-orm";
import DConn from "@/../../db/drizzle";
import Stripe from "stripe";

export async function POST(req: Request) {
    const body = await req.text();
    
    const signature = headers().get("stripe-signature") || "error";
    if (!signature || signature === "error") {
        console.error("No signature");
        return new NextResponse("No signature", { status: 400 });
    }

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET || "")
    } catch (err: any) {
        console.error("Error fetching webhook event: " ,err.message);
        return new NextResponse(err.message, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === "checkout.session.completed") {
        console.log("Checkout session completed, cheking subscription...");
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
        console.log("Subscription Metadata: ", subscription.metadata);
        if (!subscription.metadata.userId) {
            console.error("User ID not found on subscription metadata...");
            return new NextResponse("User ID not found", { status: 400 });
        }

        console.log("Subscription found, updating database...");
        await DConn().insert(userSubscription).values({
            userId: subscription.metadata.userId,
            stripeSubscriptionId: subscription.id,
            stripeCustomerId: subscription.customer as string,
            stripePriceId: subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
        }).then(() => console.log("Subscription created!"))
        .catch((err) => {
            console.error("Unable to create subscription: ", err);
            return new NextResponse(err, { status: 500 });
        });
    }

    if (event.type === "checkout.session.async_payment_succeeded") {
        console.log("Payment succeeded, updating subscription...");
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
        console.log("Subscription Metadata: ", subscription.metadata);
        if (!subscription.metadata.userId) {
            console.error("User ID not found on subscription meta data...");
            return new NextResponse("User ID not found", { status: 400 });
        }

       console.log("Subscription found, updating database...");
        await DConn().update(userSubscription).set({
            stripeSubscriptionId: subscription.id,
            stripeCustomerId: subscription.customer as string,
            stripePriceId: subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
        }).where(
            and(
                eq(userSubscription.userId, subscription.metadata.userId),
                eq(userSubscription.stripeSubscriptionId, subscription.id)
            )).then(() => console.log("Subscription updated!"))
            .catch((err) => {
                console.error("Unable to update subscription: ", err);
                return new NextResponse(err, { status: 500 });
            });
    }

    return new NextResponse("OK", { status: 200 });
}