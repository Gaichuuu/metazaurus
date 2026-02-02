import { createBrowserRouter } from "react-router-dom";
import { ZaurusShell } from "./components/zaurus";
import { CategoryPage } from "./pages/CategoryPage";
import { HomePage } from "./pages/HomePage";
import { CardsPage } from "./pages/CardsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ZaurusShell />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "cards",
        element: <CardsPage />,
      },
      {
        path: ":category",
        element: <CategoryPage />,
      },
    ],
  },
]);
