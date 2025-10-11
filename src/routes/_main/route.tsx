import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { createFileRoute, Outlet } from "@tanstack/react-router";


function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
export const Route = createFileRoute("/_main")({
  component: MainLayout,
});
