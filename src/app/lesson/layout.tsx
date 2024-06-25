import React from 'react'

type LayoutProps = {
    children: React.ReactNode;
}

export default function layout({ children }: LayoutProps) {
    return (
        <div className='flex flex-col h-full'>
            <div className='flex flex-col h-full w-full'>
                {children}
            </div>
        </div>
    )
}