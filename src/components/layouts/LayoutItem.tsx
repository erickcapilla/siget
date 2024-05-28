interface Props {
  children?: React.ReactNode;
  className?: string;
}

export const LayoutItem = ({ children, className }: Props) => {
  return (
    <article className={`flex justify-between border-l-5 text-black h-auto w-full p-2 bg-gray-100 rounded-md ${className}`}>
      { children }
    </article>
  )
}