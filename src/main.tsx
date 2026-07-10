import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
// Import the generated route tree
import { routeTree } from './routeTree.gen';
import { Toaster, toast } from 'sonner';
import { useThemeStore } from './store/themeStore';
import { useVersionStore } from './store/versionStore';
import { navigationConfig } from './components/ui/navbar-styles';

const savedLevel = useThemeStore.getState().currentLevel;
const derivedVersion = navigationConfig.levelToVersion[savedLevel] ?? 'v1';
useVersionStore.getState().setVersion(derivedVersion);

// Globally intercept and suppress toast.error when version v3 (Green Box) is active
const originalToastError = toast.error;
toast.error = (message, data) => {
  const activeVersion = useVersionStore.getState().activeVersion;
  if (activeVersion === 'v3') {
    return '';
  }
  return originalToastError(message, data);
};
// ────────────────────────────────────────────────────────────────────────────

// Create a new router instance
const router = createRouter({ routeTree });

// Create a single QueryClient instance for the app
const queryClient = new QueryClient();

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-center" richColors />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>
  );
}
