"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const useMenu = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const menu = searchParams.get("menu");

  //const menu = searchParams.get("menu");

  const updateURL = useCallback(
    (menu: string | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if ((menu && menu === "cart") || menu === "mobile") {
        params.set("menu", menu);
      } else {
        params.delete("menu");
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  return {
    onMenu: updateURL,
    menu,
  };
};

export default useMenu;
