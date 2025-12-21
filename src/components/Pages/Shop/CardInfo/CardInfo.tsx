import { Minus, Plus, Trash2 } from "lucide-react";
import { FaStar, FaPlus } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { Button } from "../../../ui/button";
import ShippingsIcon from "../../../ui/icons/shippingsIcon";
import DeliverIcon from "../../../ui/icons/deliverIcon";
import CardTable from "./CardTable";
import YouMightLike from "../YouMightLike";
import { usegetSingleProduct, useGetSingleProductImages } from "@/hooks/useProducts";
import CardInfoSkeleton from "../../../Skeletons/CardInfoSkeleton";
import { useAddCartItem } from "@/hooks/useCart";
import ReviewSection from "./ReviewSection";
import ReviewsList from "./ReviewsList";
import { useDeleteProductImage, useUploadProductImage } from "@/hooks/Admin/useProductsAdmin";
import { toast } from "sonner"; // Assuming sonner is used for toasts based on other files
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "@tanstack/react-router";

interface CardInfoProps {
  id?: number;
}

const CardInfo = ({ id }: CardInfoProps) => {
  const [counter, setCounter] = useState(1);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const { data: product, isLoading } = usegetSingleProduct(id);
  const { data: singleProductImages } = useGetSingleProductImages(id)
  const { mutateAsync: addCart } = useAddCartItem();

  const { mutateAsync: deleteImage } = useDeleteProductImage();
  const { mutateAsync: uploadImage, isPending: isUploading } = useUploadProductImage(id || 0);
  const { user } = useAuthStore()
  const isAdmin = user?.role === 'admin'
  const { isAuthenticated } = useAuthStore.getState();
  const navigate = useNavigate();



  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (product?.main_image_url && !activeImage) {
      setActiveImage(product.main_image_url);
    }
  }, [product, activeImage]);

  const handleAddCart = () => {
    if (!id) return;
    if (!isAuthenticated) {
      toast.error('Please login to add to cart');
      navigate({ to: "/auth/login" });
      return;
    }
    addCart({
      product_id: id,
      quantity: counter,
    });
  };

  const handleDeleteImage = async (imageId: number) => {
    try {
      await deleteImage(imageId);
    } catch (error) {
      console.error("Failed to delete image:", error);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);

      // Check for file size limit (approx 2MB common PHP default)
      const MAX_SIZE = 2 * 1024 * 1024;
      const validFiles = files.filter(f => {
        if (f.size > MAX_SIZE) {
          toast.error(`File ${f.name} is too large. Max size is 2MB.`);
          return false;
        }
        return true;
      });

      if (validFiles.length > 0) {
        try {
          await uploadImage(validFiles);
        } catch (error) {
          console.error("Failed to upload image:", error);
        }
      }

      // Reset input
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  if (isLoading) {
    return <CardInfoSkeleton />;
  }

  if (!product && !isLoading) {
    return <div className="flex items-center justify-center h-screen">Product not found</div>;
  }

  return (
    <>
      <div className="mt-[55px] lg:h-[627px] h-auto flex flex-col lg:flex-row gap-5 w-full items-start lg:items-center justify-between">
        <div className="flex flex-row gap-8 md:gap-3 w-full lg:w-1/2 items-center justify-center">
          <div className="flex flex-col items-center lg:w-[30%] w-1/3 justify-between gap-5 ml-0 lg:ml-9 max-h-[600px] overflow-y-auto">
            {/* Existing Images */}
            {singleProductImages?.images?.length === 0 && (
              <div className="flex items-center justify-center bg-[#F5F5F5] relative group shrink-0 cursor-pointer">
                <p className="text-gray-400">No images available</p>
              </div>
            )}{
              product?.main_image_url && (
                <div
                  className="h-[194px] w-[141px] flex items-center justify-center bg-[#F5F5F5] relative group shrink-0 cursor-pointer"
                  onClick={() => setActiveImage(product?.main_image_url || '')}
                >
                  <img
                    src={product?.main_image_url}
                    alt="main"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              )
            }
            {singleProductImages?.images?.map((img, i) => (
              <div
                key={img.id}
                onClick={() => setActiveImage(img.url)}
                className={`flex h-[194px] w-[141px] items-center justify-center bg-[#F5F5F5] relative group shrink-0 cursor-pointer ${activeImage === img.url ? 'border-2 border-black' : ''}`}
              >
                <img
                  src={img.url}
                  alt={`img${i + 1}`}
                  className="max-w-full max-h-full object-contain"
                />
                {isAdmin && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // If we delete the active image, revert to main
                      if (activeImage === img.url) setActiveImage(product?.main_image_url || null);
                      handleDeleteImage(img.id);
                    }}
                    className="absolute top-2 right-2 p-2 bg-white/80 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}

            {/* Add Image Button */}
            {isAdmin && (
              <div
                onClick={handleUploadClick}
                className="w-[150px] flex items-center justify-center h-[210px] bg-[#F5F5F5] cursor-pointer hover:bg-gray-200 transition-colors shrink-0"
              >
                {isUploading ? (
                  <span className="text-gray-400 text-sm">Uploading...</span>
                ) : (
                  <FaPlus className="w-8 h-8 text-gray-400" />
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            )}
          </div>
          <div className=" lg:w-[70%] md:w-[60%] w-full p-4 h-auto flex items-center justify-center bg-[#F5F5F5]">
            <img src={activeImage || product?.main_image_url} alt={product?.name} className="max-w-full max-h-[500px] object-contain" />
          </div>
        </div>
        <div className="flex flex-col mx-5 gap-2 w-full lg:w-1/2 ">
          <h1 className=" text-start text-xl font-bold text-[#777777] ">
            {product?.brand_name || "Brand"}
          </h1>

          <div className="flex items-center flex-wrap justify-start gap-2">
            <span className="sm:text-[24px]/[171%] font-normal text-[20px]  ">
              {product?.price}
            </span>
            <span className="text-[#9D0000] text-[16px]/[171%] font-normal line-through">
              {product?.price ? Number(product.price) + 1000 : ''}
            </span>
            <span className="h-[26px] bg-black w-[1px]"></span>
            {Array.from({ length: Math.round(Number(product?.rating || 0)) }).map((_, i) => (
              <FaStar key={i} className="text-[#D50000] w-3 h-3" />
            ))}
            <span className="text-[#9D0000]">{`(${product?.rating})` || 0} Ratings</span>
          </div>
          <div className="text-[#414141] font-normal sm:text-[24px] text-[15px]">
            {product?.description}
          </div>
          <div className="h-[1px] w-[85%] bg-[#5D0505] my-3"></div>

          <div className="flex flex-col items-start justify-start text-[15px] font-normal text-[#414141]">
            <label htmlFor=""> Whats in the box?</label>
            <ul className="list-disc ml-6">
              <li>Adaptor</li>
              <li>Cable Type C</li>
              <li>Mental Pin</li>
              <li>User Manual</li>
            </ul>
            {Number(product?.stock) === 0 && (
              <div className="w-full p-2 flex items-center justify-center bg-yellow-500 rounded-md"><span className="text-[#F8E8E8] font-semibold text-lg ">Out of stock</span></div>
            )}
          </div>
          <div className="flex items-start justify-start gap-5 mx-auto w-full flex-col lg:flex-row">
            <div className="flex items-center justify-center gap-4 border-1 border-[#D79898] h-[50px] lg:w-1/3 md:w-[90%] w-[98%] rounded-full">
              <div onClick={() => setCounter((prev) => prev - 1)}>
                <Minus />
              </div>
              <div className="w-[20px] h-[20px] flex items-center justify-center">
                {counter > 0 ? <span>{counter}</span> : <span>0</span>}
              </div>
              <div onClick={() => setCounter((prev) => prev + 1)}>
                <Plus />
              </div>
            </div>
            <Button
              variant={"auth"}
              className="rounded-full lg:w-2/3 md:w-[90%] w-[98%] sm:h-[50px] h-[50px] py-[16px] px-[24px] font-semibold text-[15px] sm:text-[18px] "
              onClick={() => {
                if (isAuthenticated) {
                  handleAddCart();
                } else {
                  toast.error('Please login to add to cart');
                  navigate({ to: "/auth/login" });
                }
              }}
              disabled={counter === 0 || isLoading || Number(product?.stock) === 0}
            >
              {isAuthenticated ? "Add to Cart" : "Login to Add to Cart"}
            </Button>
          </div>
          <div className="flex flex-col max-md:mt-4 gap-3 items-start justify-start">
            <div className="flex gap-5 items-center justify-start">
              <ShippingsIcon />
              <span className="text-[14px] font-normal text-[#424242]">
                Free worldwide shipping on all orders over $100
              </span>
            </div>
            <div className="flex gap-5 items-center justify-start">
              <DeliverIcon />
              <span className="text-[14px] font-normal text-[#424242]">
                Delivers in: 3-7 Working Days Shipping & Return
              </span>
            </div>
          </div>
        </div>
      </div>
      <CardTable id={id} />
      {id && <ReviewSection productId={id} />}
      {id && <ReviewsList productId={id} />}
      <YouMightLike
        categoryId={Number(product?.category_id)}
        brandId={product?.brand_id}
        currentProductId={id}
      />
    </>
  );
};

export default CardInfo;
