import { IconProps } from "@/types";

export const BurgerOutline: React.FC<IconProps> = ({
  size = 36,
  height,
  ...props
}) => {
  return (
    <svg
      className="size-6"
      fill="none"
      height={size || height}
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      width={size || height}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};