type Props = {
  className?: string;
  height?: number;
  size?: number;
  color: string;
};

export const ArrowRight: React.FC<Props> = ({
  size,
  height,
  color = "#FFF",
  ...props
}) => (
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
      d="M7.29279 14.707C7.10532 14.5195 7 14.2652 7 14C7 13.7348 7.10532 13.4805 7.29279 13.293L10.5858 10L7.29279 6.70701C7.11063 6.51841 7.00983 6.26581 7.01211 6.00361C7.01439 5.74141 7.11956 5.4906 7.30497 5.30519C7.49038 5.11978 7.74119 5.01461 8.00339 5.01234C8.26558 5.01006 8.51818 5.11085 8.70679 5.29301L12.7068 9.29301C12.8943 9.48054 12.9996 9.73485 12.9996 10C12.9996 10.2652 12.8943 10.5195 12.7068 10.707L8.70679 14.707C8.51926 14.8945 8.26495 14.9998 7.99979 14.9998C7.73462 14.9998 7.48031 14.8945 7.29279 14.707Z"
      fill={color}
    />
  </svg>
);
