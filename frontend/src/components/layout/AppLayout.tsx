import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { AICookingAssistant } from "@/components/ai/AICookingAssistant";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col font-body-md relative">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <AICookingAssistant />
    </div>
  );
}
