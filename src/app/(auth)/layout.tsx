type AuthProps = {
    children: React.ReactNode;
}

export default function layout({children}: AuthProps) {
  return (
    <section className='h-screen flex flex-col items-center justify-center'>
        {children}
    </section>
  );
}
