import { createBrowserRouter } from "react-router-dom";

import AppLayout from "@/components/layout/AppLayout";

import HomePage from "@/pages/HomePage";
import RecipePage from "@/pages/RecipePage";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,

    children: [
      {
        path: "/",
        element: <HomePage />,
      },

      {
        path: "/recipes/:id",
        element: <RecipePage />,
      },
    ],
  },
]);
