import { Heart, Plus } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "@tanstack/react-router";

type ProductCardProps = {
  id: number;
  title: string;
  price: string;
  oldPrice?: string;
  rating?: number;
  imgSrc: string;
  discount?: number;
  className?: string;
};

const ProductCard = ({
  id,
  title,
  price,
  oldPrice,
  rating = 5,
  imgSrc,
  discount,
  className = "",
}: ProductCardProps) => {
  const navigate = useNavigate();
  // console.log("ProductCard id:", id);
  return (
    <div
      onClick={() => {
        // console.log("Navigating to cardInfo with id:", id);
        navigate({ to: "/cardInfo", search: { id: id } });
      }}
      className={`w-full max-w-xs bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:-translate-y-3 hover:shadow-2xl duration-300 fade-up flex-wrap ${className}`}
    >
      <div className="relative bg-gradient-to-b from-white to-gray-100 p-4 flex items-center justify-center">
        <img src={imgSrc} alt={title} className="w-36 h-36 object-contain" />
        {discount ? (
          <span className="absolute top-3 right-3 text-white text-xs px-2 py-0.5 rounded-md bg-[#D50000] font-medium">
            -{discount}%
          </span>
        ) : null}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            {Array.from({ length: rating }).map((_, i) => (
              <FaStar key={i} className="text-[#880909] w-3 h-3" />
            ))}
          </div>
        </div>

        <h4 className="text-sm font-semibold mb-2 truncate">{title}</h4>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {oldPrice ? (
              <span className="text-gray-400 text-sm line-through">
                {oldPrice}
              </span>
            ) : null}
            <span className="text-[#D50000] font-semibold">{price}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              aria-label="wishlist"
              className="p-1 rounded-md hover:bg-gray-100"
            >
              <Heart className="text-[#880909] " />
            </button>
            <button
              aria-label="add"
              className="p-1 rounded-md bg-[#FFEAEA] hover:bg-[#ffdcdc]"
            >
              <Plus className="text-[#880909]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
