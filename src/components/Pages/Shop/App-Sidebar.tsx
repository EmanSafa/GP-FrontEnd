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


import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import { Checkbox } from "../../ui/checkbox";
import { useGetAllCategories } from "@/hooks/useCategories";
import type { Brand, Category } from "@/types/types";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useGetAllBrands } from "@/hooks/useBrands";

// Menu items.
const AppSidebar = () => {
  const { data: categories } = useGetAllCategories();
  const { data: brands } = useGetAllBrands();
  const navigate = useNavigate();
  // @ts-ignore - We know the search params exist on this route
  const search = useSearch({ from: '/_main/shop' });
  
  const updateFilter = (key: string, value: any) => {
    navigate({
      to: '/shop',
      search: (prev: any) => ({
        ...prev,
        [key]: value,
      }),
    });
  };

  return (
    <Sidebar className="mt-20">
      <SidebarContent>
        <SidebarGroup className="bg-[#F8E8E8] p-5 ">
          <SidebarGroupLabel className="flex items-center text-2xl font-normal mb-4 text-[#2D2D2D]">
            <span className="bg-[#9D1D1D] h-6 w-1 mr-3"></span> Categories
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="">
              <SidebarMenuItem className="text-normal text-[16px] ">
                <SidebarMenuButton asChild isActive={!search.categoryId}>
                  <Link to="/shop" search={(prev: any) => ({ ...prev, categoryId: undefined })}>
                    <span>All</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {categories?.map((category: Category) => (
                <SidebarMenuItem
                  key={category.id}
                  className="text-normal text-[16px] "
                >
                  <SidebarMenuButton asChild isActive={search.categoryId === category.id}>
                    <Link to="/shop" search={(prev: any) => ({ ...prev, categoryId: category.id })}>
                      <span>{category.name}</span>
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
                  <Switch 
                    id="new" 
                    checked={search.sort === 'created_at' && search.order === 'desc'}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        navigate({
                          to: '/shop',
                          search: (prev: any) => ({ ...prev, sort: 'created_at', order: 'desc' }),
                        });
                      } else {
                        navigate({
                          to: '/shop',
                          search: (prev: any) => {
                            const { sort, order, ...rest } = prev;
                            return rest;
                          },
                        });
                      }
                    }}
                  />
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
                      <div className="flex items-start justify-center flex-col gap-3 m-3">
                        <div className="flex items-center justify-center gap-2">
                          <Checkbox 
                            id="brand-all" 
                            className="border-black" 
                            checked={!search.brandId}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                updateFilter('brandId', undefined);
                              }
                            }}
                          />
                          <Label htmlFor="brand-all" className="text-normal text-[16px]">All</Label>
                        </div>
                        {brands?.map((brand: Brand) => (
                          <div key={brand.id} className="flex items-center  justify-center gap-2">
                            <Checkbox 
                              id={brand.id.toString()} 
                              className="border-black" 
                              checked={Number(search.brandId) === brand.id}
                              onCheckedChange={(checked) => {
                                updateFilter('brandId', checked ? brand.id : undefined);
                              }}
                            />
                            <Label
                              htmlFor={brand.id.toString()}
                              className="text-normal text-[16px] "
                            >
                              {brand.name}
                            </Label>
                          </div>
                        ))}

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
                        Price Range
                      </Label>
                      <div className="flex flex-col gap-3 m-3">
                        {[
                          { label: "All Prices", value: [0, 1000000] },
                          { label: "6000 - 10000 EGP", value: [6000, 10000] },
                          { label: "10000 - 35000 EGP", value: [10000, 35000] },
                          { label: "35000 - 50000 EGP", value: [35000, 50000] },
                          { label: "50000 - 60000 EGP", value: [50000, 60000] },
                          { label: "Above 60000 EGP", value: [60000, 1000000] },
                        ].map((range, index) => (
                          <div key={index} className="flex items-center space-x-2">
                             <Checkbox 
                              id={`price-${index}`} 
                              className="border-black rounded-full" 
                              checked={
                                (search.minPrice === range.value[0] && search.maxPrice === range.value[1]) ||
                                (!search.minPrice && !search.maxPrice && index === 0)
                              }
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  navigate({
                                    to: '/shop',
                                    search: (prev: any) => ({
                                      ...prev,
                                      minPrice: range.value[0] === 0 && range.value[1] === 1000000 ? undefined : range.value[0],
                                      maxPrice: range.value[0] === 0 && range.value[1] === 1000000 ? undefined : range.value[1],
                                    }),
                                  });
                                }
                              }}
                            />
                            <Label htmlFor={`price-${index}`}>{range.label}</Label>
                          </div>
                        ))}
                      </div>
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
