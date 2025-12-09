import * as React from "react";
import { Search, Menu, X } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import CustomSelect from "../../ui/custom-select";
import { navbarStyles, navigationConfig } from "../../ui/navbar-styles";
import { useRef } from "react";
import UserDropDown from "./UserDropDown";
import Cart from "../Cart/Cart";
import { useGetAllCategories } from "@/hooks/useCategories";


// Reusable Navigation Links Component
const NavLinks = ({
  variant = "desktop",
  onLinkClick,
}: {
  variant?: "desktop" | "tablet" | "mobile";
  onLinkClick?: () => void;
}) => {
  if (variant === "mobile") {
    return (
      <nav className={navbarStyles.navMenuList.mobile}>
        {navigationConfig.items.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={navbarStyles.navLinks.mobile}
            onClick={onLinkClick}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    );
  }
  const { data: categories } = useGetAllCategories()

  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList className={navbarStyles.navMenuList[variant]}>
        {navigationConfig.items.map((item) => (
          <NavigationMenuItem key={item.href}>
            {item.hasDropdown ? (
              <>
                <NavigationMenuTrigger
                  className={navbarStyles.navTriggers[variant]}
                >
                  {item.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className={navbarStyles.dropdownContent[variant]}>
                    {categories?.map((category) => (
                      <NavigationMenuItem
                        key={category.id}
                        title={category.name}
                      >
                        <NavigationMenuLink href={`/shop?categoryId=${category.id}`} className={navbarStyles.navLinks[variant]}>
                          {category.name}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink asChild>
                <Link to={item.href} className={navbarStyles.navLinks[variant]}>
                  {variant === "tablet" && item.label === "Contact us"
                    ? "Contact"
                    : item.label}
                </Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

// Reusable Search Bar Component
const SearchBar = ({
  variant = "desktop",
}: {
  variant?: "desktop" | "tablet" | "mobile";
}) => {
  const style = navbarStyles.searchBar[variant];
  const navigate = useNavigate();
  const [query, setQuery] = React.useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate({ to: "/shop", search: (prev: any) => ({ ...prev, q: query }) });
    }
  };

  return (
    <form onSubmit={handleSearch} className={style.container}>
      <input
        type="text"
        className={style.input}
        placeholder={style.placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className={style.button}>
        <Search className="text-white " size={style.iconSize} />
      </button>
    </form>
  );
};

// Reusable Icons Component
const ActionIcons = ({
  variant = "desktop",
}: {
  variant?: "desktop" | "tablet" | "mobile";
}) => {
  const style = navbarStyles.actionIcons[variant];

  return (
    <div className={style.container}>
      <div className={style.iconWrapper}>

        <Cart />
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const userDropDownWrapperRef = useRef<HTMLDivElement | null>(null);

  const handleLevelChange = (value: string) => {
    console.log("Selected level:", value);
  };

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={navbarStyles.layout.main}>
      {/* Top Bar - Same across all devices */}
      <div className={navbarStyles.layout.topBar}>
        <div className={navbarStyles.topBar.selectContainer}>
          <CustomSelect
            options={navigationConfig.levelOptions}
            defaultValue="level-one"
            onValueChange={handleLevelChange}
          />
        </div>

        {/* Mobile: Show menu button instead of select */}
        <button
          className={navbarStyles.topBar.mobileMenuButton}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className={navbarStyles.topBar.logo}>Logo</div>
        <div className="relative">
          {/* Keep the user's dropdown component intact and trigger it programmatically when the icon is pressed. */}
          <div
            ref={userDropDownWrapperRef}
            style={{ display: "none" }}
            aria-hidden="true"
          >
            <UserDropDown />
          </div>

          <UserDropDown />
        </div>
      </div>

      {/* Desktop Navigation (1280px+) */}
      <div className={navbarStyles.layout.desktop}>
        <NavLinks variant="desktop" />
        <SearchBar variant="desktop" />
        <ActionIcons variant="desktop" />
      </div>

      {/* Tablet Navigation (768px - 1279px) */}
      <div className={navbarStyles.layout.tablet}>
        <NavLinks variant="tablet" />
        <div className={navbarStyles.containers.tabletSearchAndIcons}>
          <SearchBar variant="tablet" />
          <ActionIcons variant="tablet" />
        </div>
      </div>

      {/* Mobile Navigation (< 768px) */}
      <div className={navbarStyles.layout.mobile}>
        <div className="flex items-center gap-2 w-full px-2">
          <div className="flex-1 min-w-2">
            <SearchBar variant="mobile" />
          </div>
          <div className="flex-shrink-0">
            <ActionIcons variant="mobile" />
          </div>
        </div>

        {/* Mobile Menu - Collapsible */}
        {isMobileMenuOpen && (
          <div className={navbarStyles.layout.mobileMenu}>
            <NavLinks variant="mobile" onLinkClick={handleMobileLinkClick} />
          </div>
        )}
      </div>
    </div>
  );
};

// function ListItem({
//   title,
//   children,
//   href,
//   ...props
// }: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
//   return (
//     <li {...props}>
//       <NavigationMenuLink asChild>
//         <Link to={href}>
//           <div className="text-sm leading-none font-medium ">{title}</div>
//           <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
//             {children}
//           </p>
//         </Link>
//       </NavigationMenuLink>
//     </li>
//   );
// }
export default Navbar;
