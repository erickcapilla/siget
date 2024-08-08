import { CardUI } from '../';

interface Props {
  title: string;
  children?: React.ReactNode;
  className?: string;
}

export const Panel = ({ title, children, className }: Props) => {
  return (
    <CardUI
      title={title}
      className={`w-full h-full ${className}`}
    >
      { children }
    </CardUI>
  )
}