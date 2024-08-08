type Props = {
  className?: string;
  height?: number;
  size?: number;
  color?: string;
};

export const ShieldExclamation: React.FC<Props> = ({
  size,
  height,
  color = "#C20E4D",
  ...props
}) => (
  <svg
    width={size || height || 24}
    height={size || height || 24}
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 8.99997V11M12 15H12.01M20.618 5.98397C17.4561 6.15189 14.3567 5.05858 12 2.94397C9.64327 5.05858 6.5439 6.15189 3.382 5.98397C3.12754 6.96908 2.99918 7.98252 3 8.99997C3 14.591 6.824 19.29 12 20.622C17.176 19.29 21 14.592 21 8.99997C21 7.95797 20.867 6.94797 20.618 5.98397Z"
      stroke={ color }
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
