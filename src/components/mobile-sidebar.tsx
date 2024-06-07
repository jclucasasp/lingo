import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu } from 'lucide-react';
import Sidebar from '@/components/sidebar';

export default function MobileSidebar() {
    return (
        <Sheet>
            <SheetTrigger>
                <Menu className='text-white' />
            </SheetTrigger>
            <SheetContent className='p-0' side={"left"} >
                <Sidebar />
            </SheetContent>
        </Sheet>
    );
}