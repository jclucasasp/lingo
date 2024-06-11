import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ClerkLoaded, SignedIn, SignInButton, SignedOut, SignUpButton, ClerkLoading } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Marketing() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center p-4 mx-auto w-full gap-8">
      <ClerkLoading>
        <Skeleton className="h-[250px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[250px]" />
        </div>
      </ClerkLoading>

      <ClerkLoaded>
        <div className="relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] lg:mb-0">
          <Image src={"/hero.svg"} fill alt="hero image" />
        </div>
        <section className="flex flex-col gap-4">
          <h1 className="text-balance font-bold text-neutral-600 text-sm lg:text-lg">
            Learn, practice and master new languages with Lingo.
          </h1>
          <SignedOut>
            <SignUpButton mode="modal" forceRedirectUrl={"/learn"}>
              <Button size={"lg"} variant={"secondary"} >Get Started</Button>
            </SignUpButton>

            <SignInButton mode="modal">
              <Button className="" size={"lg"} variant={"sec_outline"}>I already have an account</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Button size={"lg"} variant={"secondary"} asChild>
              <Link href={"/learn"}>Continue Learning</Link>
            </Button>
          </SignedIn>
        </section>
      </ClerkLoaded>
    </section>
  );
}
