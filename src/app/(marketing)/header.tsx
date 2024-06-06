import { Button } from '@/components/ui/button';
import { ClerkLoaded, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Image from 'next/image';

export default function Header() {
  return (
    <header className='p-2 w-full border-b-2 border-slate-200'>
      <div className='lg:max-w-screen-xl mx-auto flex items-center justify-between h-full'>
        <div className='flex items-center gap-3'>
          <Image src={"/mascot.svg"} height={40} width={40} alt='mascot' />
          <h1 className='text-2xl font-extrabold text-green-600 tracking-wide'>Lingo</h1>
        </div>
        <ClerkLoaded>
          <SignedIn>
            <UserButton afterSignOutUrl='/' />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button size={"lg"} variant={"ghost"}>Login</Button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </header>
  );
}