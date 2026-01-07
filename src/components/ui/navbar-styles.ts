// Navbar Styles Configuration
export const navbarStyles = {
  // Navigation Link Styles
  navLinks: {
    desktop:
      "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
    tablet:
      "group inline-flex h-8 w-max items-center justify-center rounded-md bg-background px-3 py-1 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
    mobile:
      "text-sm font-medium py-2 px-3 rounded-md hover:bg-gray-100 transition-colors block w-full text-left",
  },

  // Navigation Trigger Styles (for dropdown menus)
  navTriggers: {
    desktop: "",
    tablet: "h-8 px-3 py-1 text-sm",
    mobile:
      "text-sm font-medium py-2 px-3 rounded-md hover:bg-gray-100 transition-colors block w-full text-left",
  },

  // Navigation Menu List Styles
  navMenuList: {
    desktop: "",
    tablet: "flex gap-2",
    mobile: "flex flex-col p-4 space-y-3",
  },

  // Dropdown Content Styles
  dropdownContent: {
    desktop: "grid gap-2 w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]",
    tablet: "grid gap-2 w-[300px] md:w-[400px] md:grid-cols-2",
    mobile: "",
  },

  // Search Bar Styles
  searchBar: {
    desktop: {
      container: "flex items-center justify-center flex-1 max-w-2xl mx-auto", // Center and restrict width
      input:
        "border px-4 py-2 border-black rounded-l-full w-full h-[2.5rem] focus:outline-none",
      button:
        "bg-black flex items-center justify-center rounded-r-full h-[2.5rem] w-[4rem]", // rounded-full for pill shape
      iconSize: 20,
      placeholder: "Search products...",
    },
    tablet: {
      container: "flex items-center",
      input:
        "border-2 px-2 py-1 border-black rounded-l-2xl w-[200px] h-[1.8rem]",
      button:
        "bg-black flex items-center justify-center rounded-r-2xl h-[1.8rem] w-[3rem]",
      iconSize: 16,
      placeholder: "Search...",
    },
    mobile: {
      container: "bg-white flex items-center justify-center p-3 border-b",
      input:
        "border-2 px-3 py-2 border-black rounded-l-2xl flex-1 max-w-md h-[2.2rem]",
      button:
        "bg-black flex items-center justify-center rounded-r-2xl h-[2.2rem] w-[3rem] p-2",
      iconSize: 18,
      placeholder: "Search...",
    },
  },

  // Action Icons Styles
  actionIcons: {
    desktop: {
      container: "flex items-center gap-3",
      iconWrapper: "flex items-center gap-3",
      iconSize: 24,
    },
    tablet: {
      container: "flex items-center gap-3",
      iconWrapper: "flex items-center gap-3",
      iconSize: 20,
    },
    mobile: {
      container: "flex items-center justify-end p-3",
      iconWrapper: "flex items-center gap-3",
      iconSize: 20,
    },
  },

  // Layout Containers
  layout: {
    main: "bg-white fixed top-0 left-0 right-0 z-50 mb-3",
    topBar:
      "bg-gray-50/50 w-full justify-between px-2 md:px-5 flex items-center z-[60] relative",
    desktop:
      "hidden xl:flex items-center justify-between px-10 bg-transparent pb-3 z-40 relative",
    tablet:
      "hidden md:flex xl:hidden items-center justify-between px-4 py-3 bg-transparent z-40 relative",
    mobile: "md:hidden flex flex-col z-50",
    mobileMenu: "bg-white border-t shadow-lg z-50 relative",
  },

  // Top Bar Elements
  topBar: {
    selectContainer: "hidden md:block scale-90",
    mobileMenuButton: "md:hidden text-black",
    logo: "h-10 w-auto object-contain",
    userIcon: "text-black",
  },

  // Responsive Containers
  containers: {
    tabletSearchAndIcons: "flex items-center gap-4",
  },
};

// Navigation Items Configuration
export const navigationConfig = {
  items: [
    { href: "/", label: "Home", hasDropdown: false },
    { href: "/shop", label: "Shop", hasDropdown: true },
    { href: "/contact", label: "Contact us", hasDropdown: false },
    { href: "/about", label: "About", hasDropdown: false },
  ],

  levelOptions: [
    { value: "level-one", label: "Level one" },
    { value: "level-two", label: "Level two" },
    { value: "level-three", label: "Level three" },
  ],
};
