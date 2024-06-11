type FeedProps = {
  children: React.ReactNode;
}

export default function FeedWrapper({ children }: FeedProps) {
  return (
    <div className="flex flex-col flex-1">
      {children}
    </div>
  )
}