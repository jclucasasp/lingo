import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="hidden mx-auto md:block w-full border-t-2 border-slate-200 p-2">
      <div className='max-w-screen-xl mx-auto flex items-center justify-evenly h-full'>
        <Button size={"lg"} variant={"ghost"}>
          <Image src={"/hr.svg"} height={32} width={35} alt="croatian flag" className="mr-2 rounded-sm"/>
          Croation
        </Button>
        <Button size={"lg"} variant={"ghost"}>
          <Image src={"/fr.svg"} height={32} width={35} alt="france flag" className="mr-2 rounded-sm"/>
          France
        </Button>
        <Button size={"lg"} variant={"ghost"}>
          <Image src={"/it.svg"} height={32} width={35} alt="italy flag" className="mr-2 rounded-sm"/>
          Italian
        </Button>
        <Button size={"lg"} variant={"ghost"}>
          <Image src={"/es.svg"} height={32} width={35} alt="spanish flag" className="mr-2 rounded-sm"/>
          Spanish
        </Button>
        <Button size={"lg"} variant={"ghost"}>
          <Image src={"/jp.svg"} height={32} width={35} alt="japan flag" className="mr-2 rounded-sm"/>
          Japanese
        </Button>
      </div>
    </footer>
  );
}