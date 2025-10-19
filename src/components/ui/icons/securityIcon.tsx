interface IProps {
  className?: string;
}

const SecurityIcon = ({ className }: IProps) => {
  return (
    <svg
      width={40}
      height={40}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M20 40C20 40 40 36 40 6L20 0L0 6C0 38 20 40 20 40ZM20 5.22L34.884 9.685C33.647 28.877 22.829 33.849 19.754 34.879C16.831 34.161 6.242 30.151 5.1 9.69L20 5.22Z"
        fill="#5C5C5C"
      />
      <path
        d="M29.536 14L26 10.465L18 18.465L14 14.465L10.464 18L18 25.535L29.536 14Z"
        fill="#5C5C5C"
      />
    </svg>
  );
};

export default SecurityIcon;
