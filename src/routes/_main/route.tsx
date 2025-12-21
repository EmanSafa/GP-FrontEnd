import Footer from "@/components/Pages/Footer/Footer";
import Navbar from "@/components/Pages/Navbar/Navbar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className=" mt-18 ">
        <Outlet />
        <div className="h-80"></div>
      </main>
      <Footer />
    </div>
  );
}
export const Route = createFileRoute("/_main")({
  beforeLoad: () => {
    // Authentication check moved to specific routes (Cart, Checkout)
  },
  component: MainLayout,
});
