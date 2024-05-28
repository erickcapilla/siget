import { LayoutMain } from "./LayoutMain";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <LayoutMain>
      <div className="flex max-[639px]:flex-col  gap-3 h-full">{children}</div>
    </LayoutMain>
  );
};
