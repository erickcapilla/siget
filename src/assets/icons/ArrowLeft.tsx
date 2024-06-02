type Props = {
  className?: string;
  height?: number;
  size?: number;
  color: string;
};

export const ArrowLeft: React.FC<Props> = ({ size, height, color = "#FFF", ...props }) => (
  <svg
    width={size || height || 24}
    height={size || height || 24}
    {...props}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.7068 5.293C12.8943 5.48053 12.9996 5.73484 12.9996 6C12.9996 6.26516 12.8943 6.51947 12.7068 6.707L9.41379 10L12.7068 13.293C12.8889 13.4816 12.9897 13.7342 12.9875 13.9964C12.9852 14.2586 12.88 14.5094 12.6946 14.6948C12.5092 14.8802 12.2584 14.9854 11.9962 14.9877C11.734 14.99 11.4814 14.8892 11.2928 14.707L7.29279 10.707C7.10532 10.5195 7 10.2652 7 10C7 9.73484 7.10532 9.48053 7.29279 9.293L11.2928 5.293C11.4803 5.10553 11.7346 5.00021 11.9998 5.00021C12.265 5.00021 12.5193 5.10553 12.7068 5.293Z"
      fill={color}
    />
  </svg>
);
