import { Button } from '@/components/ui/button';
import { QUESTS } from '@/lib/constants';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import Link from 'next/link';

type QuestItemProps = {
    points: number;
}
export default function QuestItems({ points }: QuestItemProps) {

    return (
        <section className='w-full border-2 border-slate-200 p-4 rounded-xl mt-4'>
            <div className='flex items-center justify-between'>
                <p className='font-bold'>Quests</p>
                <Link href={'/quests'}>
                <Button  variant={"ghost"} className='cursor-pointer'>View All</Button>
                </Link>
            </div>
            {QUESTS.map((quest, i) => {
                const progress = Math.round((points / quest.value) * 100);
                return (
                    <div key={i} className="flex items-center justify-between gap-2 w-full">
                        <div className="mt-4">
                            <Image src={"/points.svg"} height={50} width={50} alt="points" />
                        </div>
                        <div className="w-full">
                            <p className='text-sm'>{quest.title}</p>
                            <Progress value={progress} />
                        </div>
                    </div>
                );
            })}
        </section>
    );
}
