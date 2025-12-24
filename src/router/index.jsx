import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@layouts/RootLayout";

// Lazy loading de páginas para code splitting
const HomePage = lazy(() => import("@pages/HomePage/HomePage"));
const AboutPage = lazy(() => import("@pages/AboutPage/AboutPage"));
const ProjectsPage = lazy(() => import("@pages/ProjectsPage/ProjectsPage"));
const ContactPage = lazy(() => import("@pages/ContactPage/ContactPage"));

// Componente de carga mientras se obtiene la página
const PageLoader = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "60vh",
      color: "var(--primary-light)",
    }}
  >
    <div>Cargando...</div>
  </div>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<PageLoader />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: "projects",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProjectsPage />
          </Suspense>
        ),
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ContactPage />
          </Suspense>
        ),
      },
    ],
  },
]);
