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
import InfoCard from "../ui/info-card";
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
                        {" "}
                        <Button className="mt-5 w-full md:w-40 text-lg rounded-sm cursor-pointer bg-[#5D0505] text-white hover:bg-[#7a0707]">
                          Shop Now
                        </Button>
                      </Link>
                    </div>
                    <img src={saleImg} alt="sale" className="w-44 sm:w-56 md:w-72 lg:w-96 object-contain" />
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
    </div>
  );
};
export default HomePage;
