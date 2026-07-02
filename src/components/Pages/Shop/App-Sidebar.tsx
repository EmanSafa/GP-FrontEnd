import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { ChevronDown } from 'lucide-react';
import { Checkbox } from '../../ui/checkbox';
import { useGetAllCategories } from '@/hooks/useCategories';
import type { Brand, Category } from '@/types/types';
import { Link, useNavigate, useSearch } from '@tanstack/react-router';
import { useGetAllBrands } from '@/hooks/useBrands';
import type { ShopSearch } from '@/routes/_main/shop';

const AppSidebar = () => {
  const { data: categories } = useGetAllCategories();
  const { data: brands } = useGetAllBrands();
  const navigate = useNavigate();
  const search = useSearch({ from: '/_main/shop' });

  const updateFilter = <K extends keyof ShopSearch>(key: K, value: ShopSearch[K]) => {
    void navigate({
      to: '/shop',
      search: (prev: ShopSearch) => ({
        ...prev,
        [key]: value,
      }),
    });
  };

  return (
    <Sidebar className="top-14 h-[calc(100svh-3.5rem)]! border-r border-gray-100 bg-white">
      <SidebarContent className="bg-white">
        <SidebarGroup className="bg-plate-1 p-5">
          <SidebarGroupLabel className="flex items-center text-2xl font-normal mb-4 text-plate-7">
            <span className="bg-plate-6 h-6 w-1 mr-3"></span> Categories
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="text-normal text-[16px]">
                <SidebarMenuButton
                  asChild
                  isActive={!search.categoryId}
                  className="hover:bg-white/50 data-[active=true]:bg-white data-[active=true]:font-bold transition-colors rounded-md p-2"
                >
                  <Link
                    to="/shop"
                    search={(prev: ShopSearch) => ({ ...prev, categoryId: undefined })}
                  >
                    <span>All</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {categories?.map((category: Category) => (
                <SidebarMenuItem key={category.id} className="text-normal text-[16px]">
                  <SidebarMenuButton
                    asChild
                    isActive={search.categoryId === category.id}
                    className="hover:bg-white/50 data-[active=true]:bg-white data-[active=true]:font-bold transition-colors rounded-md p-2"
                  >
                    <Link
                      to="/shop"
                      search={(prev: ShopSearch) => ({ ...prev, categoryId: category.id })}
                    >
                      <span>{category.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="bg-plate-1 p-5">
          <SidebarGroupLabel className="flex items-center text-2xl font-normal mb-4 text-plate-7">
            <span className="bg-plate-6 h-6 w-1 mr-3"></span> Filter
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-4">
              <SidebarMenuItem>
                <div className="flex items-center justify-between px-2">
                  <Label htmlFor="new" className="text-normal text-[16px] cursor-pointer">
                    New Arrivals
                  </Label>
                  <Switch
                    id="new"
                    checked={search.sort === 'created_at' && search.order === 'desc'}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        void navigate({
                          to: '/shop',
                          search: (prev: ShopSearch) => ({
                            ...prev,
                            sort: 'created_at',
                            order: 'desc',
                          }),
                        });
                      } else {
                        void navigate({
                          to: '/shop',
                          search: (prev: ShopSearch) => ({
                            categoryId: prev.categoryId,
                            brandId: prev.brandId,
                            minPrice: prev.minPrice,
                            maxPrice: prev.maxPrice,
                            q: prev.q,
                          }),
                        });
                      }
                    }}
                  />
                </div>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarGroup className="p-0">
                    <SidebarGroupLabel asChild className="p-0 hover:bg-transparent">
                      <CollapsibleTrigger className="text-normal text-[16px] flex w-full items-center justify-between p-2 hover:bg-white/50 rounded-md cursor-pointer text-plate-7">
                        Brands
                        <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </CollapsibleTrigger>
                    </SidebarGroupLabel>
                    <CollapsibleContent>
                      <div className="flex flex-col gap-3 px-2 py-3">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="brand-all"
                            className="border-gray-500"
                            checked={search.brandId === undefined || search.brandId === null}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                updateFilter('brandId', undefined);
                              }
                            }}
                          />
                          <Label
                            htmlFor="brand-all"
                            className="text-normal text-[16px] cursor-pointer"
                          >
                            All
                          </Label>
                        </div>
                        {brands?.map((brand: Brand) => (
                          <div key={brand.id} className="flex items-center gap-2">
                            <Checkbox
                              id={brand.id.toString()}
                              className="border-gray-500"
                              checked={
                                search.brandId !== undefined &&
                                search.brandId !== null &&
                                Number(search.brandId) === Number(brand.id)
                              }
                              onCheckedChange={(checked) => {
                                updateFilter('brandId', checked ? brand.id : undefined);
                              }}
                            />
                            <Label
                              htmlFor={brand.id.toString()}
                              className="text-normal text-[16px] cursor-pointer"
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
                  <SidebarGroup className="p-0">
                    <SidebarGroupLabel asChild className="p-0 hover:bg-transparent">
                      <CollapsibleTrigger className="text-normal text-[16px] flex w-full items-center justify-between p-2 hover:bg-white/50 rounded-md cursor-pointer text-plate-7">
                        Price
                        <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </CollapsibleTrigger>
                    </SidebarGroupLabel>
                    <CollapsibleContent>
                      <div className="flex flex-col gap-3 px-2 py-3">
                        {[
                          { label: 'All Prices', value: [0, 1000000] },
                          { label: '6000 - 10000 EGP', value: [6000, 10000] },
                          { label: '10000 - 35000 EGP', value: [10000, 35000] },
                          { label: '35000 - 50000 EGP', value: [35000, 50000] },
                          { label: '50000 - 60000 EGP', value: [50000, 60000] },
                          { label: 'Above 60000 EGP', value: [60000, 1000000] },
                        ].map((range, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Checkbox
                              id={`price-${index}`}
                              className="border-gray-500 rounded-full"
                              checked={
                                (search.minPrice === range.value[0] &&
                                  search.maxPrice === range.value[1]) ||
                                ((search.minPrice === undefined || search.minPrice === null) &&
                                  (search.maxPrice === undefined || search.maxPrice === null) &&
                                  index === 0)
                              }
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  void navigate({
                                    to: '/shop',
                                    search: (prev: ShopSearch) => ({
                                      ...prev,
                                      minPrice:
                                        range.value[0] === 0 && range.value[1] === 1000000
                                          ? undefined
                                          : range.value[0],
                                      maxPrice:
                                        range.value[0] === 0 && range.value[1] === 1000000
                                          ? undefined
                                          : range.value[1],
                                    }),
                                  });
                                }
                              }}
                            />
                            <Label
                              htmlFor={`price-${index}`}
                              className="text-normal text-[16px] cursor-pointer"
                            >
                              {range.label}
                            </Label>
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
