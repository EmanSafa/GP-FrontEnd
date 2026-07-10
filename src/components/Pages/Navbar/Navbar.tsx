import * as React from 'react';
import { Search, Menu, X, ChevronDown } from 'lucide-react';
import { Link, useNavigate, useLocation } from '@tanstack/react-router';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { navbarStyles, navigationConfig } from '../../ui/navbar-styles';
import UserDropDown from './UserDropDown';
import { useThemeStore } from '@/store/themeStore';
import { useVersionStore } from '@/store/versionStore';
import { useAuthStore } from '@/store/authStore';
import { useHighlightStore } from '@/store/highlightStore';
import { UpgradeSessionDialog } from './UpgradeSessionDialog';
import Cart from '../Cart/Cart';
import { useGetAllCategories } from '@/hooks/useCategories';
import logo from './../../../assets/logo.png';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useScanBugs } from '@/hooks/useScanBugs';

// Reusable Navigation Links Component
const NavLinks = ({
  variant = 'desktop',
  onLinkClick,
}: {
  variant?: 'desktop' | 'tablet' | 'mobile';
  onLinkClick?: () => void;
}) => {
  if (variant === 'mobile') {
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
  const { data: categories } = useGetAllCategories();

  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList className={navbarStyles.navMenuList[variant]}>
        {navigationConfig.items.map((item) => (
          <NavigationMenuItem key={item.href}>
            {item.hasDropdown ? (
              <>
                <NavigationMenuTrigger className={navbarStyles.navTriggers[variant]}>
                  {item.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className={navbarStyles.dropdownContent[variant]}>
                    {categories?.map((category) => (
                      <NavigationMenuItem key={category.id} title={category.name}>
                        <NavigationMenuLink
                          href={`/shop?categoryId=${category.id}`}
                          className={navbarStyles.navLinks[variant]}
                        >
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
                  {variant === 'tablet' && item.label === 'Contact us' ? 'Contact' : item.label}
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
const SearchBar = ({ variant = 'desktop' }: { variant?: 'desktop' | 'tablet' | 'mobile' }) => {
  const style = navbarStyles.searchBar[variant];
  const navigate = useNavigate();
  const [query, setQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      void navigate({
        to: '/shop',
        search: (prev: Record<string, unknown>) => ({ ...prev, q: query }),
      });
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
      {query && (
        <span className="">
          Searching for <span className="font-medium ">{query}</span> in products....
        </span>
      )}
    </div>
  );
};

// Reusable Icons Component
const ActionIcons = ({ variant = 'desktop' }: { variant?: 'desktop' | 'tablet' | 'mobile' }) => {
  const style = navbarStyles.actionIcons[variant];

  return (
    <div className={style.container}>
      <div className={style.iconWrapper}>
        {/* <Heart className="cursor-pointer hover:text-gray-600 transition-colors" size={style.iconSize} /> */}
        <Cart />
        <UserDropDown />
      </div>
    </div>
  );
};

// ─── LogoSelect ───────────────────────────────────────────────────────────────
// The app logo doubles as the box/version selector trigger.
// Clicking the logo opens a dropdown showing available security levels.
// Selecting a level updates both the visual theme (themeStore) and the
// API version (versionStore) — Blue Box auto-selects V2.
const LogoSelect = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const currentLevel = useThemeStore((state) => state.currentLevel);
  const isReauthRequired = useAuthStore((state) => state.isReauthRequired);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Re-authentication states for proactive upgrade to JWT (v2 / blue-box)
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = React.useState(false);
  const [pendingLevel, setPendingLevel] = React.useState('');

  const handleSelect = (value: string) => {
    const version = navigationConfig.levelToVersion[value] ?? 'v1';
    const { isAuthenticated, token, user } = useAuthStore.getState();

    // If changing to v2 (blue-box), user is logged in, but has no JWT token
    if (version === 'v2' && isAuthenticated && !token && user?.email) {
      setPendingLevel(value);
      setIsUpgradeModalOpen(true);
      setIsOpen(false);
      return;
    }

    // Otherwise, switch version immediately
    useThemeStore.getState().setLevel(value);
    useVersionStore.getState().setVersion(version);
    useHighlightStore.getState().resetBugScanner();
    setIsOpen(false);
  };

  // Color accent per box
  const accentColor: Record<string, string> = {
    'red-box': 'bg-red-500',
    'blue-box': 'bg-blue-500',
    'green-box': 'bg-green-500',
  };

  return (
    <div className="relative flex items-center gap-2">
      {/* Logo — acts as dropdown trigger */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="flex items-center gap-1.5 group focus:outline-none"
        title="Switch security level"
      >
        <img
          src={logo}
          alt="Bugsy logo"
          className={`${navbarStyles.topBar.logo} transition-transform group-hover:scale-105`}
        />
        {/* Small colored dot + chevron to hint it's clickable */}
        <span
          className={`hidden md:inline-block w-2 h-2 rounded-full ${accentColor[currentLevel] ?? 'bg-gray-400'} ring-2 ring-white shadow`}
        />
        <ChevronDown
          className={`hidden md:block w-3 h-3 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-[100] min-w-[170px] overflow-hidden">
          <div className="px-3 py-2 text-[10px] font-semibold text-gray-400 uppercase tracking-widest border-b">
            Security Level
          </div>
          {navigationConfig.levelOptions.map((option) => {
            const isActive = option.value === currentLevel;
            const version = navigationConfig.levelToVersion[option.value] ?? 'v1';
            return (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`w-full text-left px-3 py-2.5 text-sm flex items-center gap-2.5 transition-colors
                  ${isActive ? 'bg-gray-100 font-semibold' : 'hover:bg-gray-50'}`}
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${accentColor[option.value] ?? 'bg-gray-400'}`}
                />
                <span className="flex-1">{option.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md
                  ${version === 'v2' ? 'bg-blue-100 text-blue-700' : version === 'v3' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
                >
                  {version.toUpperCase()}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Click-outside overlay */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}

      <UpgradeSessionDialog
        isOpen={(isUpgradeModalOpen || isReauthRequired) && isAuthenticated}
        pendingLevel={pendingLevel || currentLevel}
        onClose={() => {
          setIsUpgradeModalOpen(false);
          setPendingLevel('');
          useAuthStore.getState().setReauthRequired(false);
        }}
        onSuccess={() => {
          setIsUpgradeModalOpen(false);
          setPendingLevel('');
          useAuthStore.getState().setReauthRequired(false);
        }}
      />
    </div>
  );
};

// ─── NavTopBar
export const NavTopBar = () => {
  const { scanBugs } = useScanBugs();
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  const isLoginPage = location.pathname === '/auth/login';
  const authPath = isLoginPage ? '/auth/signup' : '/auth/login';
  const authLabel = isLoginPage ? 'Sign Up' : 'Sign In';

  return (
    <div className="bg-gray-50/50 w-full justify-between px-2 md:px-5 flex items-center z-[60] relative h-[3.6rem] border-b border-gray-100">
      <LogoSelect />
      <div className="flex items-center gap-3">
        {!isAuthenticated && (
          <Link to={authPath} className="no-underline">
            <Button
              variant="outline"
              className="text-black border-black hover:bg-gray-100 font-semibold"
            >
              {authLabel}
            </Button>
          </Link>
        )}
        <Button variant={'default'} onClick={scanBugs}>
          Scan Bugs
        </Button>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scanBugs } = useScanBugs();
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  const isLoginPage = location.pathname === '/auth/login';
  const authPath = isLoginPage ? '/auth/signup' : '/auth/login';
  const authLabel = isLoginPage ? 'Sign Up' : 'Sign In';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div
      className={`${navbarStyles.layout.main} transition-all duration-300 ${isScrolled ? 'bg-plate-1/95 backdrop-blur shadow-md py-0' : 'bg-white'}`}
    >
      {/* Top Bar - Same across all devices */}
      <div
        className={`${navbarStyles.layout.topBar} ${isScrolled ? 'h-0 py-0 overflow-hidden opacity-0' : 'h-[3.6rem] opacity-100'} transition-all duration-300`}
      >
        <div className="flex items-center gap-4">
          {/* Logo acts as the box/version selector trigger */}
          <LogoSelect />

          {/* Mobile: Show menu button instead of select */}
          <button
            className={navbarStyles.topBar.mobileMenuButton}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Right Side: Action Buttons */}
        <div className="flex items-center gap-3">
          {!isAuthenticated && (
            <Link to={authPath} className="no-underline">
              <Button
                variant="outline"
                className="text-black border-black hover:bg-gray-100 font-semibold"
              >
                {authLabel}
              </Button>
            </Link>
          )}
          <Button variant={'default'} onClick={scanBugs}>
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
