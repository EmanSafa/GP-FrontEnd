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
import saleImg from "../../assets/saleImg.png";
import { Link } from "@tanstack/react-router";
import ShippingIcon from "../ui/icons/shippingIcon";
import ReturnsIcon from "../ui/icons/returnsIcon";
import SecurityIcon from "../ui/icons/securityIcon";
import PhoneCallIcon from "../ui/icons/phoneIcon";
import InfoCard from "./Home/info-card";
import phoneImg from "../../assets/mobile.png";
import ProductCard from "./Home/product-card";
import { FaAngleRight } from "react-icons/fa";
import appleLogo from "../../assets/logos-brand/apple.png";
import huwawiLogo from "../../assets/logos-brand/huawai.png";
import samsungLogo from "../../assets/logos-brand/samsung.png";
import realmeLogo from "../../assets/logos-brand/Realme.png";
import vivoLogo from "../../assets/logos-brand/vivo.png";
import CategoryCard from "./Home/Category-card";
import mobileIcon from "../../assets/categories/mobile.png";
import watchIcon from "../../assets/categories/watch.png";

const HomePage = () => {
  return (
    <div>
      <Carousel className="w-[88%] mx-auto mt-7  ">
        <CarouselContent>
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className=" w-full">
                <Card className="bg-[#FFEAEA]">
                  <CardContent className="flex flex-col lg:flex-row min-h-[360px] justify-between px-6 lg:px-10 items-center gap-6">
                    <div className="flex flex-col gap-4 items-center  text-center">
                      <span className="text-[#5B5B5B] text-sm font-light ">
                        Special Offer
                      </span>
                      <span className="font-semibold text-5xl max-w-xs text-center ">
                        SALE UP TO 40%
                      </span>
                      <Link to="/shop">
                        <Button className="mt-5 w-full md:w-40 text-lg rounded-sm cursor-pointer bg-[#5D0505] text-white hover:bg-[#7a0707]">
                          Shop Now
                        </Button>
                      </Link>
                    </div>
                    <img
                      src={saleImg}
                      alt="sale"
                      className="w-44 sm:w-56 md:w-72 lg:w-96 object-contain"
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
      <div className="grid xl:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5  w-[88%] mx-auto mt-12 mb-10 info-grid">
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
        <h1 className="lg:text-2xl sm:text-md md:text-lg font-semibold">
          Grab your best deal
        </h1>
        <Button
          variant="auth"
          className="group mt-5 text-md md:w-40 sm:w-20 sm:text-sm text-lg rounded-full flex items-center justify-center transition-all"
        >
          View All
          <FaAngleRight className="transform transition-transform duration-300 group-hover:translate-x-3" />
        </Button>
      </div>
      <div className="w-[88%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 my-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <ProductCard
            key={i}
            title={`Galaxy Ultra ${i + 1}`}
            price="$960"
            oldPrice="$1200"
            rating={5}
            imgSrc={phoneImg}
            discount={20}
          />
        ))}
      </div>
      <div>
        <div className="w-[88%] mx-auto mt-7">
          <h1 className="lg:text-2xl sm:text-sm md:text-lg font-semibold">
            Shop by Category
          </h1>
          <Carousel className="mt-5" opts={{ align: "start" }}>
            <CarouselContent className=" gap-3">
              {[
                <CategoryCard title="Smartphones" image={mobileIcon} />,
                <CategoryCard title="Smart Watch" image={watchIcon} />,
                <CategoryCard title="Laptop" image={mobileIcon} />,
                <CategoryCard title="Tablet" image={mobileIcon} />,
                <CategoryCard title="HeadPhones" image={mobileIcon} />,
                <CategoryCard title="Accessories" image={mobileIcon} />,
              ].map((b, idx) => (
                <CarouselItem key={idx} className="basis-auto">
                  {b}
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-7 lg:hidden" />
            <CarouselNext className="mr-7 lg:hidden" />
          </Carousel>
        </div>
        <div className="w-[88%] mx-auto mt-7">
          <h1 className="text-2xl font-semibold">Shop by Brand</h1>
          <Carousel className="mt-5" opts={{ align: "start" }}>
            <CarouselContent className=" gap-4">
              {[
                <img src={appleLogo} alt="apple_logo" />,
                <img src={huwawiLogo} alt="huwawi_logo" />,
                <img src={samsungLogo} alt="samsung_logo" />,
                <img src={realmeLogo} alt="realme_logo" />,
                <img src={vivoLogo} alt="vivo_logo" />,
              ].map((b, idx) => (
                <CarouselItem key={idx} className="basis-auto">
                  <div className=" rounded-lg w-60  h-18 bg-gray-200 flex items-center justify-center">
                    {b}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-7 " />
            <CarouselNext className="mr-7 " />
          </Carousel>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
