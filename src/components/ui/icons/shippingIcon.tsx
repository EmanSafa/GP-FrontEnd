interface IProps {
  className?: string;
}

const ShippingIcon = ({ className }: IProps) => {
  return (
    <svg
      width={37}
      height={35}
      viewBox="0 0 37 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M18.5 16.5882V33M18.5 16.5882L35 9.29412M18.5 16.5882L2 9.29412M18.5 33L34.4043 25.9692C34.7664 25.8091 35 25.4505 35 25.0546V9.29412M18.5 33L2.59568 25.9692C2.23357 25.8091 2 25.4505 2 25.0546V9.29412M35 9.29412L18.9043 2.17874C18.6468 2.06489 18.3532 2.06489 18.0957 2.17874L2 9.29412"
        stroke="#5C5C5C"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.25 5.64709L26.1543 12.6779C26.5164 12.838 26.75 13.1966 26.75 13.5925V18.4118"
        stroke="#5C5C5C"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ShippingIcon;
