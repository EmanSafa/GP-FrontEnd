import { Outlet, createRootRoute } from '@tanstack/react-router';
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import '../index.css';
import { useEffect } from 'react';
import { useThemeStore } from '@/store/themeStore';
import { useHighlightStore } from '@/store/highlightStore';

export const Route = createRootRoute({
  component: () => {
    const activeTheme = useThemeStore((state) => state.currentLevel);

    useEffect(() => {
      document.body.classList.remove('red-box', 'blue-box', 'green-box');
      document.body.classList.add(activeTheme);
      // Clear old bug scanner highlights when switching levels/versions
      useHighlightStore.getState().resetBugScanner();
    }, [activeTheme]);

    return <Outlet />;
  },
});
