import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Outlet, createRootRoute } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import "../index.css";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      {/* {      <TanStackRouterDevtools /> */}
    </>
  );
};
export const Route = createRootRoute({
  component: RootLayout,
});
