import { createRootRoute, Outlet } from "@tanstack/react-router";

import { Button } from "@vellumlabs/cexplorer-sdk/Button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import { useEffect } from "react";
import { useThemeStore } from "@vellumlabs/cexplorer-sdk/ThemeStore";

const RootComponent = () => {
  const { theme } = useThemeStore();

  useEffect(() => {
    const preloader = document.getElementById("preloader");

    if (preloader) {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.remove();
      }, 500);
    }
  }, []);

  useEffect(() => {
    const appleTheme = document.querySelector(
      "meta[name='theme-color']",
    ) as HTMLMetaElement;

    if (appleTheme) {
      appleTheme.content = theme === "light" ? "#ffffff" : "#252933";
    }
  }, [theme]);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => (
    <div className='flex min-h-minHeight w-full flex-col items-center justify-center gap-2 text-text-xl'>
      <p>This page doesn't exist...</p>
      <Button
        label='Go back'
        variant='primary'
        size='md'
        className='hover:text-white'
      />
    </div>
  ),
});
