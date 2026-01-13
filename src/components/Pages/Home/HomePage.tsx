
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import saleImg from "../../../assets/saleImg.png";
import { Link, useNavigate } from "@tanstack/react-router";
import ShippingIcon from "../../ui/icons/shippingIcon";
import ReturnsIcon from "../../ui/icons/returnsIcon";
import SecurityIcon from "../../ui/icons/securityIcon";
import PhoneCallIcon from "../../ui/icons/phoneIcon";
import InfoCard from "./info-card";
import phoneImg from "../../../assets/mobile.png";
import ProductCard from "./product-card";
import { FaAngleRight } from "react-icons/fa";
import appleLogo from "../../../assets/logos-brand/apple.png";

import CategoryCard from "./Category-card";
import mobileIcon from "../../../assets/categories/mobile.png";

import hero2 from "../../../assets/hero2.png";
import hero3 from "../../../assets/hero3.png";
import hero32 from "../../../assets/hero32.png";
import UserFeedback from "./UserFeedback";
import { useGetAllCategories } from "@/hooks/useCategories";
import { useGetAllBrands } from "@/hooks/useBrands";
import { useGetProducts } from "@/hooks/useProducts";
import { useGetProductReviews } from "@/hooks/useReviews";

import Autoplay from "embla-carousel-autoplay";

const HomePage = () => {
  const navigate = useNavigate();


  const { data: categories } = useGetAllCategories();
  const { data: brands } = useGetAllBrands();
  const { data: productsData } = useGetProducts({
    per_page: 5,
    sort: "rating",
    order: "desc",
  });

  // Use the first product as a featured product for reviews
  const featuredProductId = productsData?.products?.[0]?.id;
  const { data: productReviews } = useGetProductReviews(
    Number(featuredProductId),
    { enabled: !!featuredProductId }
  );

  // Note: heroApi is available if we need to control the carousel programmatically, 
  // but now we use the Autoplay plugin for automatic sliding.

  return (
    <div className="animate-in fade-in zoom-in duration-500">
      <Carousel
        className="w-[88%] mx-auto mt-7  "

        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
      >
        <CarouselContent>
          {[
            { img: saleImg, bg: "bg-plate-1/50", textColor: "text-plate-7" },
            {
              img: hero2,
              bg: "bg-gradient-to-r from-plate-2 to-plate-7",
              textColor: "text-white",
            },
            { img: hero3, bg: "bg-plate-1", textColor: "text-plate-8" },
            { img: hero32, bg: "bg-plate-2/30", textColor: "text-plate-6" },
          ].map((slide, index) => (
            <CarouselItem key={index}>
              <div className="w-full">
                <Card className={`${slide.bg} transform transition-transform duration-500 hover:scale-[1.01]`}>
                  <CardContent
                    className={`flex flex-col lg:flex-row min-h-[360px] justify-between px-6 lg:px-10 items-center gap-6 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""
                      }`}
                  >
                    <div
                      className={`flex flex-col gap-4 items-center text-center ${slide.textColor} animate-in slide-in-from-left duration-700 delay-100`}
                    >
                      <span className="text-sm font-light">Special Offer</span>
                      <span className="font-semibold text-5xl max-w-xs text-center">
                        SALE UP TO 40%
                      </span>
                      <Link to="/shop">
                        <Button className="mt-5 w-full md:w-40 text-lg rounded-sm cursor-pointer bg-plate-8 text-white hover:bg-plate-7 transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
                          Shop Now
                        </Button>
                      </Link>
                    </div>

                    <img
                      src={slide.img}
                      alt={`hero-${index}`}
                      className="w-44 sm:w-56 md:w-72 lg:w-96 object-contain animate-in slide-in-from-right duration-700 delay-200 hover:scale-110 transition-transform duration-500"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-9" />
        <CarouselNext className="mr-9" />
        <div className="absolute left-1/2 -bottom-5 -translate-x-1/2 z-10">
          <CarouselDots />
        </div>
      </Carousel>
      <div className="grid xl:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5  w-[88%] mx-auto mt-12 mb-10 info-grid animate-in slide-in-from-bottom-10 fade-in duration-700 delay-300">
        <InfoCard
          title="Free Shipping"
          description="Free shipping on orders over 10K EGP"
          icon={<ShippingIcon />}
          animationDelay={0}
        />
        <InfoCard
          title="Free returns"
          description="30-days free return policy"
          icon={<ReturnsIcon />}
          animationDelay={100}
        />
        <InfoCard
          title="Free payment"
          description="We accept all major credit cards"
          icon={<SecurityIcon />}
          animationDelay={200}
        />
        <InfoCard
          title="Customer service"
          description="Top notch customer service"
          icon={<PhoneCallIcon />}
          animationDelay={300}
        />
      </div>
      <div className="flex items-center justify-between w-[88%] mx-auto mt-7">
        <h1 className="lg:text-2xl bg-background sm:text-md md:text-lg font-semibold">
          Grab your best deal
        </h1>
        <Button
          variant="auth"
          className="group mt-5 text-md md:w-40 sm:w-20 sm:text-sm text-lg rounded-full flex items-center justify-center transition-all hover:bg-plate-7 hover:text-white hover:scale-105 shadow-md active:scale-95"
          onClick={() => navigate({ to: "/shop" })}
        >
          View All
          <FaAngleRight className="transform transition-transform duration-300 group-hover:translate-x-2" />
        </Button>
      </div>
      <div className="w-[88%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 my-8 animate-in slide-in-from-bottom-5 fade-in duration-700 delay-500">
        {productsData?.products?.map((product) => (
          <ProductCard
            key={product.id}
            id={Number(product.id)}
            title={product.name}
            price={`$${product.price}`}
            // oldPrice="$1200" // Assuming no old price in API for now, or calculate it
            rating={Number(product.rating) || 5}
            // Use local image fallback if url missing, or just a placeholder
            imgSrc={product.main_image_url || phoneImg}
            discount={product.stock && product.stock > 0 ? 0 : undefined} // Or some logic for discount
            className="hover:scale-105 transition-all duration-300 hover:shadow-2xl"
          />
        ))}
      </div>
      <div>
        <div className="w-[88%] mx-auto mt-7">
          <h1 className="lg:text-2xl sm:text-sm md:text-lg font-semibold">
            Shop by Category
          </h1>
          <Carousel
            className="mt-5"
            opts={{ align: "start" }}
          >
            <CarouselContent className=" gap-3">
              {categories?.map((cat) => (
                <CarouselItem key={cat.id} className="basis-auto group">
                  <div
                    onClick={() => navigate({ to: "/shop", search: { categoryId: cat.id } })}
                    className="transition-transform duration-300 group-hover:-translate-y-2"
                  >
                    <CategoryCard title={cat.name} image={cat.cat_image_url || mobileIcon} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-7 lg:hidden" />
            <CarouselNext className="mr-7 lg:hidden" />
          </Carousel>
        </div>

        <div className="flex justify-center items-center">
          <div className="w-[88%] mx-auto mt-7 ">
            <h1 className="text-2xl font-semibold">Shop by Brand</h1>
            <Carousel
              className="mt-5"
              opts={{ align: "start" }}
            >
              <CarouselContent className=" gap-4">
                {brands?.map((brand) => (
                  <CarouselItem key={brand.id} className="basis-auto">
                    <div
                      onClick={() => navigate({ to: "/shop", search: { brandId: brand.id } })}
                      className="cursor-pointer rounded-lg w-60 h-18 bg-gray-50 hover:bg-white transition-all duration-300 border border-transparent hover:border-gray-200 flex items-center justify-center p-4 hover:shadow-lg hover:scale-105"
                    >
                      <img
                        src={brand.logo_url || appleLogo}
                        alt={brand.name}
                        className="max-h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 transform"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="ml-7 " />
              <CarouselNext className="mr-7 " />
            </Carousel>
          </div>
        </div>
        <div className="w-[88%] mx-auto mt-10 ">
          <h1 className="text-2xl font-semibold mb-10">User Feedback</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
            {/* Fallback to static if no reviews, or just map the first 3 reviews */}
            {(productReviews?.reviews && productReviews.reviews.length > 0)
              && productReviews.reviews.slice(0, 3).map((review: any, index: number) => (
                <UserFeedback
                  key={index}
                  // Use product main image as background or a generic one if not available
                  img={productsData?.products?.[0]?.main_image_url || "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=600&fit=crop"}
                  user={review.user_name || "Anonymous"}
                  userComment={review.comment}
                  // Random user avatar or placeholder
                  userImg={`https://api.dicebear.com/7.x/avataaars/svg?seed=${review.user_name || index}`}
                />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
