import Image from "next/image";

export default function Marketing() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center p-4 gap-2 lg:flex-row mx-auto w-full">
      <div className="relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0">
        <Image src={"/hero.svg"} fill alt="hero image" />
      </div>
    </section>
  );
}
