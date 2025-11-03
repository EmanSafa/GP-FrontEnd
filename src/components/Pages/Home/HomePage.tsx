import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import saleImg from "../../../assets/saleImg.png";
import { Link } from "@tanstack/react-router";
import ShippingIcon from "../../ui/icons/shippingIcon";
import ReturnsIcon from "../../ui/icons/returnsIcon";
import SecurityIcon from "../../ui/icons/securityIcon";
import PhoneCallIcon from "../../ui/icons/phoneIcon";
import InfoCard from "./info-card";
import phoneImg from "../../../assets/mobile.png";
import ProductCard from "./product-card";
import { FaAngleRight, FaStar } from "react-icons/fa";
import appleLogo from "../../../assets/logos-brand/apple.png";
import huwawiLogo from "../../../assets/logos-brand/huawai.png";
import samsungLogo from "../../../assets/logos-brand/samsung.png";
import realmeLogo from "../../../assets/logos-brand/Realme.png";
import vivoLogo from "../../../assets/logos-brand/vivo.png";
import CategoryCard from "./Category-card";
import mobileIcon from "../../../assets/categories/mobile.png";
import laptop from "../../../assets/laptop.png";
import tablet from "../../../assets/tablet.png";
import headphone from "../../../assets/headphoes.png";
import accessors from "../../../assets/accessors.png";
import watchIcon from "../../../assets/categories/watch.png";
import newArrivalImg from "../../../assets/newarrival.png";
import iphoneImg from "../../../assets/iphones.png";
import hero2 from "../../../assets/hero2.png";
import hero3 from "../../../assets/hero3.png";
import hero32 from "../../../assets/hero32.png";
import UserFeedback from "./UserFeedback";

const HomePage = () => {
  const [heroApi, setHeroApi] = React.useState<CarouselApi | null>(null);
  const [isPaused, setIsPaused] = React.useState(false);

  const testimonials = [
    {
      img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=600&fit=crop",
      user: "Sagy Reda",
      userComment:
        "One of the best ecommerce product, easy to use & value of time i demand that's why i am recommanding",
      userImg:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    {
      img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=600&fit=crop",
      user: "Emma Wilson",
      userComment:
        "Outstanding quality and exceptional service! This product exceeded all my expectations and I highly recommend it to everyone",
      userImg:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    {
      img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=600&fit=crop",
      user: "James Anderson",
      userComment:
        "Amazing experience from start to finish. The attention to detail and customer support are second to none. Worth every penny",
      userImg:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
  ];

  React.useEffect(() => {
    if (!heroApi) return;

    const play = () => {
      const selected = heroApi.selectedScrollSnap();
      const snaps = heroApi.scrollSnapList();
      if (snaps.length === 0) return;
      if (selected >= snaps.length - 1) {
        heroApi.scrollTo(0);
      } else {
        heroApi.scrollNext();
      }
    };

    const interval = setInterval(() => {
      if (!isPaused) play();
    }, 3000);

    return () => clearInterval(interval);
  }, [heroApi, isPaused]);
  return (
    <div>
      <Carousel
        className="w-[88%] mx-auto mt-7  "
        setApi={setHeroApi}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <CarouselContent>
          {[
            { img: saleImg, bg: "bg-[#FFEAEA]", textColor: "text-[#5B5B5B]" },
            {
              img: hero2,
              bg: "bg-gradient-to-r from-[#F1C6D2] to-[#8F3B52]",
              textColor: "text-white",
            },
            { img: hero3, bg: "bg-[#E8F7FF]", textColor: "text-[#123456]" },
            { img: hero32, bg: "bg-[#FFF4E6]", textColor: "text-[#5B5B5B]" },
          ].map((slide, index) => (
            <CarouselItem key={index}>
              <div className="w-full">
                <Card className={`${slide.bg}`}>
                  <CardContent
                    className={`flex flex-col lg:flex-row min-h-[360px] justify-between px-6 lg:px-10 items-center gap-6 ${
                      index % 2 === 1 ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`flex flex-col gap-4 items-center text-center ${slide.textColor}`}
                    >
                      <span className="text-sm font-light">Special Offer</span>
                      <span className="font-semibold text-5xl max-w-xs text-center">
                        SALE UP TO 40%
                      </span>
                      <Link to="/shop/mobile">
                        <Button className="mt-5 w-full md:w-40 text-lg rounded-sm cursor-pointer bg-[#5D0505] text-white hover:bg-[#7a0707]">
                          Shop Now
                        </Button>
                      </Link>
                    </div>

                    <img
                      src={slide.img}
                      alt={`hero-${index}`}
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
          <Carousel
            className="mt-5"
            opts={{ align: "start" }}
            setApi={setHeroApi}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <CarouselContent className=" gap-3">
              {[
                <CategoryCard title="Smartphones" image={mobileIcon} />,
                <CategoryCard title="Smart Watch" image={watchIcon} />,
                <CategoryCard title="Laptop" image={laptop} />,
                <CategoryCard title="Tablet" image={tablet} />,
                <CategoryCard title="HeadPhones" image={headphone} />,
                <CategoryCard title="Accessories" image={accessors} />,
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

        <div className="flex justify-center items-center">
          <div className="w-[88%] mx-auto mt-7 ">
            <h1 className="text-2xl font-semibold">Shop by Brand</h1>
            <Carousel
              className="mt-5"
              opts={{ align: "start" }}
              setApi={setHeroApi}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
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
            <h1 className="text-2xl font-semibold my-9">New Arrival</h1>
            <div className="flex flex-col md:flex-row items-center justify-between ">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2  grid-rows-4 sm:grid-rows-2 gap-5 w-full ">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div className="flex items-center flex-wrap " key={i}>
                    <img src={newArrivalImg} alt="" />
                    <div className="h-[295px] boder-2 border-gray-200 flex-1">
                      <span className="h-[60%] block bg-gray-100 rounded-md"></span>
                      <div className="p-1  h-[40%]">
                        <div className="flex items-start flex-col gap-1 ml-2 mt-2 justify-between">
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, j) => (
                              <FaStar
                                key={j}
                                className="text-[#880909] w-4 h-4 md:w-5 md:h-5"
                              />
                            ))}
                          </div>
                          <h4 className="text-base md:text-lg font-semibold truncate">
                            Galaxy Ultra
                          </h4>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-sm md:text-base">
                                $900
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <img
                src={iphoneImg}
                alt=""
                className=" hidden lg:block w-40 h-64 ml-6 sm:w-56 sm:h-80 md:w-72 md:h-[400px] lg:w-[303px] lg:h-[628px] object-contain"
              />
            </div>
          </div>
        </div>
        <div className="w-[88%] mx-auto mt-10 ">
          <h1 className="text-2xl font-semibold mb-10">User Feedback</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {testimonials.map((testimonial, index) => (
              <UserFeedback
                key={index}
                img={testimonial.img}
                user={testimonial.user}
                userComment={testimonial.userComment}
                userImg={testimonial.userImg}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
