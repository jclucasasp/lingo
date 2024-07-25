"use server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getUserSubscription } from "@/../db/queries";
import { absoluteUrl } from "@/lib/utils";
import { stripe } from "@/lib/stripe";

const returnUrl = absoluteUrl("/shop");

export const createStripeUrl = async () => {
    const { userId } = auth();
    const user = await currentUser();
    
    if (!userId || !user) {
        throw new Error("No user found");
    }

    const userSubscription = await getUserSubscription();
    if (userSubscription && userSubscription.stripeCustomerId) {
        const stripeSession = await stripe.billingPortal.sessions.create({
            customer: userSubscription.stripeCustomerId,
            return_url: returnUrl,
        });

        return { data: stripeSession.url };
    }

    const stripeSession = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [
            {
                quantity: 1,
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: "Lingo",
                        description: "Unlimited Hearts",
                    },
                    unit_amount_decimal: process.env.LINGO_PRICE,
                    recurring: {
                        interval: "month",
                    }
                },
            },
        ],
        metadata: {
            userId: userId,
        },
        success_url: returnUrl,
        cancel_url: returnUrl,
    });

    return { data: stripeSession.url };
}