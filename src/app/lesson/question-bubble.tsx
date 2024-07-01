import Image from "next/image";

type QuestionBubbleProps = {
    question: string
}

export function QuestionBubble({ question }: QuestionBubbleProps) {
    return (
        <div className="flex items-center gap-x-4 mb-6">
            <Image src={"/mascot.svg"} height={60} width={60} alt="mascot" className="hidden lg:block" />
            <Image src={"/mascot.svg"} height={40} width={40} alt="mascot" className="lg:hidden block" />
            <div className="relative py-2 px-4 border-2 rounded-xl text-sm lg:text-base">
                {question}
                <div className="absolute border-x-8 border-t-8 border-x-slate rotate-90 -left-3 top-1/2 border-x-transparent transform -translate-y-1/2"/>
            </div>
        </div>
    );
}