import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "@/components/layout/AppLayout";
import HomePage from "@/pages/Home/HomePage";
import PantryPage from "@/pages/Pantry/PantryPage";
import { MealPlannerPage } from "@/pages/MealPlanner/MealPlannerPage";
import { CookingGuidePage } from "@/pages/CookingGuide/CookingGuidePage";
import LoginPage from "@/pages/Login/LoginPage";
import RegisterPage from "@/pages/Register/RegisterPage";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/discover",
          element: <HomePage />,
        },
        {
          path: "/ingredients",
          element: <PantryPage />,
        },
        {
          path: "/pantry",
          element: <PantryPage />,
        },
        {
          path: "/planner",
          element: <MealPlannerPage />,
        },
        {
          path: "/cooking-guide",
          element: <CookingGuidePage />,
        },
        {
          path: "/recipes/:id",
          element: <CookingGuidePage />,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);
