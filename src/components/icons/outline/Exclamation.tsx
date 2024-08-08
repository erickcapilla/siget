import { IconProps } from "@/types";

export const ExclamationOutline: React.FC<IconProps> = ({
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
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
      />
    </svg>
  );
};
