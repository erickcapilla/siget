import { IconProps } from "@/types";

export const CircleCheckOutline: React.FC<IconProps> = ({
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
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
        clipRule="evenodd"
      />
    </svg>
  );
};