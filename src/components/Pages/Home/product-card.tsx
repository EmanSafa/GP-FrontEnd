import { Plus } from 'lucide-react';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from '@tanstack/react-router';
import { useAddCartItem } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';

type ProductCardProps = {
  id: number;
  title: string;
  price: number;
  oldPrice?: number;
  rating?: number;
  imgSrc: string;
  discount?: number;
  className?: string;
  stock?: number;
};

const ProductCard = ({
  id,
  title,
  price,
  oldPrice,
  rating = 5,
  imgSrc,
  discount,
  className = '',
  stock,
}: ProductCardProps) => {
  const navigate = useNavigate();
  const { mutate: addToCart, isPending } = useAddCartItem();
  const { isAuthenticated } = useAuthStore.getState();

  const isOutOfStock = stock !== undefined && Number(stock) === 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error('Please login to add to cart');
      void navigate({ to: '/auth/login' });
      return;
    }
    if (isOutOfStock) return;
    addToCart({ product_id: id, quantity: 1 });
  };

  return (
    <div
      onClick={() => {
        void navigate({ to: '/cardInfo', search: { id } });
      }}
      className={`relative w-full max-w-sm rounded-lg shadow-md overflow-hidden duration-300 fade-up flex-wrap cursor-pointer
        ${
          isOutOfStock
            ? 'opacity-60 grayscale bg-gray-100 hover:shadow-md'
            : 'bg-white transition-transform transform hover:-translate-y-3 hover:shadow-2xl'
        }
        ${className}`}
    >
      {/* Image area */}
      <div
        className={`relative p-4 flex items-center justify-center
        ${isOutOfStock ? 'bg-gray-200' : 'bg-gradient-to-b from-white to-plate-1'}`}
      >
        <img src={imgSrc} alt={title} className="w-36 h-36 object-contain" />

        {/* Discount badge — hidden when out of stock */}
        {!isOutOfStock && discount ? (
          <span className="absolute top-3 right-3 text-white text-xs px-2 py-0.5 rounded-md bg-plate-7 font-medium">
            -{discount}%
          </span>
        ) : null}

        {/* Out of stock badge */}
        {isOutOfStock && (
          <span className="absolute top-3 left-1/2 -translate-x-1/2 bg-gray-700 text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap shadow">
            Out of Stock
          </span>
        )}
      </div>

      {/* Info area */}
      <div className={`p-4 ${isOutOfStock ? 'bg-gray-100' : 'bg-white'}`}>
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: Math.round(rating) }).map((_, i) => (
            <FaStar
              key={i}
              className={`w-3 h-3 ${isOutOfStock ? 'text-gray-400' : 'text-plate-8'}`}
            />
          ))}
        </div>

        <h4 className="text-sm font-semibold mb-2 truncate">{title}</h4>

        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start">
            {oldPrice ? (
              <span className="text-gray-400 text-sm line-through whitespace-nowrap">
                {formatPrice(oldPrice)}
              </span>
            ) : null}
            <span
              className={`font-semibold whitespace-nowrap ${isOutOfStock ? 'text-gray-500' : 'text-plate-7'}`}
            >
              {formatPrice(price)}
            </span>
          </div>

          <button
            aria-label="add to cart"
            onClick={handleAddToCart}
            disabled={isOutOfStock || isPending}
            className={`p-1 rounded-md transition-colors
              ${
                isOutOfStock
                  ? 'bg-gray-200 cursor-not-allowed opacity-50'
                  : 'bg-plate-1 hover:bg-plate-2'
              }`}
          >
            <Plus className={isOutOfStock ? 'text-gray-400' : 'text-plate-8'} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
