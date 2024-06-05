import { Button } from "@/components/ui/button";

export default function Buttons() {
  return (
    <section className="flex flex-col p-4 gap-6 max-w-[250px]">
        <Button>Default</Button>
        <Button variant={"primary"}>Primary</Button>
        <Button variant={"prime_outline"}>Primary Outline</Button>
        <Button variant={"secondary"}>secondary</Button>
        <Button variant={"sec_outline"}>secondary Outline</Button>
        <Button variant={"danger"}>Danger</Button>
        <Button variant={"dang_outline"}>Danger Outline</Button>
        <Button variant={"super"}>Super</Button>
        <Button variant={"sup_outline"}>Super Outline</Button>
        <Button variant={"ghost"}>Ghost</Button>
        <Button variant={"sidebar"}>Sidebar</Button>
        <Button variant={"side_outline"}>Sidebar Outline</Button>
    </section>
  );
}
