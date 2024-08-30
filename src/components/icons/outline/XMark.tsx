import { IconProps } from "@/types";

export const XMark: React.FC<IconProps> = ({ size = 36, height, ...props }) => {
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
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );
};
