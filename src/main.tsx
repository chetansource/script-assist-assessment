import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import Landing from "./pages/landing/Landing";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import { useAuthStore } from "./store/app.store";
import { Navigate } from "react-router-dom";
import { CharacterDetail } from "./pages/dashboard/CharacterDetail";

// PrivateRoute component to protect private routes
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Navigate to="/login" />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/character/:id", // Dynamic route for character details
        element: (
          <PrivateRoute>
            <CharacterDetail />
          </PrivateRoute>
        ),
      },
      // Fallback route for 404 errors
      {
        path: "*",
        element: <Navigate to="/login" />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: 1000 * 60 * 15,
    },
  },
});
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
