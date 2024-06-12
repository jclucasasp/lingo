import { Button } from "@/components/ui/button";
import Image from "next/image";

function Buttons() {
  const falgs = [
    { src: '/hr.svg', country: 'croatian' },
    { src: '/fr.svg', country: 'france' },
    { src: '/it.svg', country: 'italy' },
    { src: '/es.svg', country: 'spanish' },
  ];

  return (
    <>
      {falgs.map((flag, i) => (
        <Button key={i} size={'lg'} variant={'ghost'}>
          <Image src={flag.src} height={32} width={32} alt={`${flag.country} flag`} className="mr-2 rounded-sm"/>
          {flag.country}
        </Button>
      ))}
    </>
  )
}

export default function Footer() {

  return (
    <footer className="hidden mx-auto md:block w-full border-t-2 border-slate-200 p-2">
      <div className='max-w-screen-xl mx-auto flex items-center justify-evenly h-full'>
       <Buttons />
      </div>
    </footer>
  );
}