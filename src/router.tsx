import React, { createContext, useContext, useState, useEffect } from "react";

export type PathRoute = "/" | "/why-us" | "/services" | "/products" | "/contact";

interface RouterContextProps {
  currentPath: string;
  navigate: (to: PathRoute) => void;
}

const RouterContext = createContext<RouterContextProps | undefined>(undefined);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    // Default to correct normalized pathname
    const path = window.location.pathname;
    // Strip trailing slashes unless it is root
    if (path.length > 1 && path.endsWith("/")) {
      return path.slice(0, -1);
    }
    return path || "/";
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || "/";
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: "instant" as any });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (to: PathRoute) => {
    window.history.pushState(null, "", to);
    setCurrentPath(to);
    window.scrollTo({ top: 0, behavior: "instant" as any });
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error("useRouter must be used within a RouterProvider");
  }
  return context;
};
