import * as React from "react";
import { Search, Menu, X, Heart } from "lucide-react";
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
import UserDropDown from "./UserDropDown";
import Cart from "../Cart/Cart";
import { useGetAllCategories } from "@/hooks/useCategories";
import logo from './../../../assets/logo.png'
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useHighlightStore } from "@/store/highlightStore";


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
    <div className="flex flex-col items-center gap-1">
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
      {query && <span className="">Searching for <span className="font-medium ">{query}</span> in products....</span>}
    </div>
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
        <Heart className="cursor-pointer hover:text-gray-600 transition-colors" size={style.iconSize} />
        <Cart />
        <UserDropDown />
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { triggerHighlight } = useHighlightStore();

  const handleprofileScanBug = () => {
    triggerHighlight('profile-pic', {
      name: "RCE - Remote code execution",
      description: "The profile picture component lacks proper image optimization and fallback handling, potentially causing layout shifts.",
      originalCode: `<img src={user.image} alt="Profile" />`,
      fixedCode: `<Image 
  src={user.image} 
  alt="Profile" 
  width={80} 
  height={80} 
  className="rounded-full object-cover"
  onError={(e) => e.currentTarget.src = fallbackImage}
/>`
    });
    triggerHighlight('userdataCors', {
      name: 'CORS - Cross-Origin Resource Sharing',
      description: 'The user data component is not using proper CORS headers, potentially allowing cross-origin requests.',
      originalCode: `<UserDropDown > <UserDropDown> `,
      fixedCode: `<UserDropDown > <UserDropDown>`
    })
    triggerHighlight('changePasswordBug', {
      name: 'CSRF => Cross site request forgery',
      description: 'The change password component is not using proper CORS headers, potentially allowing cross-origin requests.',
      originalCode: `<form onSubmit={handleSubmit} className="space-y-4">`,
      fixedCode: `<form onSubmit={handleSubmit} className="space-y-4">`
    })

    navigate({ to: '/account' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLevelChange = (value: string) => {
    console.log("Selected level:", value);
  };

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div
      className={`${navbarStyles.layout.main} transition-all duration-300 ${isScrolled ? "bg-[#F8E8E8]/95 backdrop-blur shadow-md py-0" : "bg-white"}`}
    >
      {/* Top Bar - Same across all devices */}
      <div className={`${navbarStyles.layout.topBar} ${isScrolled ? "h-0 py-0 overflow-hidden opacity-0" : "h-[3.6rem] opacity-100"} transition-all duration-300`}>
        <div className="flex items-center gap-4">
          <img src={logo} alt="logo" className={navbarStyles.topBar.logo} />

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
        </div>

        {/* Right Side: Scan Bugs Button */}
        <div>
          <Button variant={'default'} onClick={handleprofileScanBug}>
            Scan Bugs
          </Button>
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


export default Navbar;
