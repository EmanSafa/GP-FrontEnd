import * as React from "react";
import {
  CircleUserRound,
  Heart,
  Link,
  Search,
  ShoppingBagIcon,
  Menu,
  X,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import CustomSelect from "./ui/custom-select";
import { navbarStyles, navigationConfig } from "./ui/navbar-styles";
const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },

  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

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
          <a
            key={item.href}
            href={item.href}
            className={navbarStyles.navLinks.mobile}
            onClick={onLinkClick}
          >
            {item.label}
          </a>
        ))}
      </nav>
    );
  }

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
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink
                href={item.href}
                className={navbarStyles.navLinks[variant]}
              >
                {variant === "tablet" && item.label === "Contact us"
                  ? "Contact"
                  : item.label}
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

  return (
    <div className={style.container}>
      <input
        type="text"
        className={style.input}
        placeholder={style.placeholder}
      />
      <span className={style.button}>
        <Search className="text-white" size={style.iconSize} />
      </span>
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
        <Heart size={style.iconSize} />
        <ShoppingBagIcon size={style.iconSize} />
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

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
        <CircleUserRound className={navbarStyles.topBar.userIcon} />
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
        <SearchBar variant="mobile" />
        <ActionIcons variant="mobile" />

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

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium ">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
export default Navbar;
