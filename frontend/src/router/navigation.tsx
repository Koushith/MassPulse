import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { AboutPage, HomePage, PricingPage, ProfilePage } from "../pages";
import { SuggestionsPage } from "../pages/suggestions/suggestions.page";

export const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
        //add later
      },
      {
        path: "/pricing",
        element: <PricingPage />,
      },
      {
        path: "/suggestions",
        element: <SuggestionsPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },
]);
