import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";
// Menu items.
const items = [
  {
    title: " Mobile",
    url: "/shop/mobile",
  },
  {
    title: "Laptop",
    url: "/shop/laptop",
  },
  {
    title: "Tablet",
    url: "/shop/tablet",
  },
  {
    title: "Headphones",
    url: "/shop/headphones",
  },
  {
    title: "Smartwatches",
    url: "/shop/smartwatches",
  },
  {
    title: "Accessories",
    url: "/shop/accessories",
  },
];

const AppSidebar = () => {
  return (
    <Sidebar className="mt-20">
      <SidebarContent>
        <SidebarGroup className="bg-[#F8E8E8] p-5 ">
          <SidebarGroupLabel className="flex items-center text-2xl font-normal mb-4 text-[#2D2D2D]">
            <span className="bg-[#9D1D1D] h-6 w-1 mr-3"></span> Categories
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="">
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className="text-normal text-[16px] "
                >
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="bg-[#F8E8E8] p-5 ">
          <SidebarGroupLabel className="flex items-center text-2xl font-normal mb-4 text-[#2D2D2D]">
            <span className="bg-[#9D1D1D] h-6 w-1 mr-3"></span> Filter
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              <SidebarMenuItem>
                <div className="flex items-center justify-between ml-4 ">
                  <Label htmlFor="new" className="text-normal text-[16px] ">
                    New
                  </Label>
                  <Switch id="new" />
                </div>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <div className="flex items-center justify-between ml-4 ">
                  <Label
                    htmlFor="bestseller"
                    className="text-normal text-[16px] "
                  >
                    Bestseller
                  </Label>
                  <Switch id="bestseller" />
                </div>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarGroup>
                    <SidebarGroupLabel asChild>
                      <CollapsibleTrigger className="text-normal text-[16px] ">
                        Brands
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </CollapsibleTrigger>
                    </SidebarGroupLabel>
                    <CollapsibleContent>
                      <SidebarGroupContent />
                      <div className="flex items-center gap-3 m-3">
                        <Checkbox id="apple" className="border-black" />
                        <Label
                          htmlFor="apple"
                          className="text-normal text-[16px] "
                        >
                          Apple
                        </Label>
                      </div>
                      <div className="flex items-center gap-3 m-3">
                        <Checkbox id="samsung" className="border-black" />
                        <Label
                          htmlFor="samsung"
                          className="text-normal text-[16px] "
                        >
                          Samsung
                        </Label>
                      </div>
                      <div className="flex items-center gap-3 mt-3 mx-3">
                        <Checkbox id="oppo" className="border-black" />
                        <Label
                          htmlFor="oppo"
                          className="text-normal text-[16px] "
                        >
                          Oppo
                        </Label>
                      </div>
                    </CollapsibleContent>
                  </SidebarGroup>
                </Collapsible>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarGroup>
                    <SidebarGroupLabel asChild>
                      <CollapsibleTrigger className="text-normal text-[16px] ">
                        Price
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </CollapsibleTrigger>
                    </SidebarGroupLabel>
                    <CollapsibleContent>
                      <Label className="text-normal text-[16px] m-3 text-[#414141] ">
                        Between (value in EGP)
                      </Label>
                      <Slider
                        defaultValue={[0, 100]}
                        max={100}
                        step={1}
                        className="m-3 text-[#9D1D1D]"
                      ></Slider>
                      <div className="flex justify-between mt-2 mx-3">
                        <Button variant="auth" size="sm">
                          0
                        </Button>
                        <Button variant="auth" size="sm">
                          100
                        </Button>
                      </div>
                    </CollapsibleContent>
                  </SidebarGroup>
                </Collapsible>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarGroup>
                    <SidebarGroupLabel asChild>
                      <CollapsibleTrigger className="text-normal text-[16px] ">
                        Reviews
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </CollapsibleTrigger>
                    </SidebarGroupLabel>
                    <CollapsibleContent>
                      <div className="flex items-center gap-1">
                        <Checkbox id="4stars" className="m-3 border-black" />
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FaStar key={i} className="text-[#880909] w-3 h-3" />
                        ))}
                      </div>
                      <div className="flex items-center gap-1">
                        <Checkbox id="4stars" className="m-3 border-black" />
                        {Array.from({ length: 4 }).map((_, i) => (
                          <FaStar key={i} className="text-[#880909] w-3 h-3" />
                        ))}
                        <CiStar className="text-[#880909] w-3 h-3" />
                      </div>
                      <div className="flex items-center gap-1">
                        <Checkbox id="4stars" className="m-3 border-black" />
                        {Array.from({ length: 3 }).map((_, i) => (
                          <FaStar key={i} className="text-[#880909] w-3 h-3" />
                        ))}
                        {Array.from({ length: 2 }).map((_, i) => (
                          <CiStar key={i} className="text-[#880909] w-3 h-3" />
                        ))}
                      </div>
                      <div className="flex items-center gap-1">
                        <Checkbox id="4stars" className="m-3 border-black" />
                        {Array.from({ length: 2 }).map((_, i) => (
                          <FaStar key={i} className="text-[#880909] w-3 h-3" />
                        ))}
                        {Array.from({ length: 3 }).map((_, i) => (
                          <CiStar key={i} className="text-[#880909] w-3 h-3" />
                        ))}
                      </div>
                      <div className="flex items-center gap-1">
                        <Checkbox id="4stars" className="m-3 border-black" />
                        {Array.from({ length: 1 }).map((_, i) => (
                          <FaStar key={i} className="text-[#880909] w-3 h-3" />
                        ))}
                        {Array.from({ length: 4 }).map((_, i) => (
                          <CiStar key={i} className="text-[#880909] w-3 h-3" />
                        ))}
                      </div>
                      <div className="flex items-center gap-1">
                        <Checkbox id="4stars" className="m-3 border-black" />
                        {Array.from({ length: 5 }).map((_, i) => (
                          <CiStar key={i} className="text-[#880909] w-3 h-3" />
                        ))}
                      </div>
                      <div className="h-20"></div>
                    </CollapsibleContent>
                  </SidebarGroup>
                </Collapsible>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
export default AppSidebar;
