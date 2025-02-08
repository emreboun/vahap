"use client";

import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { getUrlSlug } from "./utils";

export const useRouting = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams()
  const pathname = usePathname();

  const setParams = (key: string, value?: string) => {
    if (!params || !pathname || !searchParams) {
      return;
    }
    const keyParam = params[key];
    if (!keyParam || Array.isArray(keyParam)) {
      return;
    }
    const newPath = pathname.replace(keyParam, value || '');
    router.push(`${newPath}?${searchParams.toString()}`);
  }

  const setSearchParams = (key: string, value?: string) => {
    if (!searchParams) {
      return;
    }
    const current = new URLSearchParams(Array.from(searchParams.entries()))

    if (value) {
      current.set(key, value);
    } else {
      current.delete(key);
    }

    router.push(`${pathname}?${current.toString()}`);
  }

  const getRoute = (route: string, key: string) => {
    //if (!pathname || !searchParams || !params || !router) return "";
    const slug = getUrlSlug(route);
    const keyParam: any = !params || params[key];
    if (!keyParam || Array.isArray(keyParam)) {
      return `${pathname}/${slug}?${searchParams?.toString() ?? ""}`;
    }

    return `${pathname?.replace(keyParam, slug || '')}?${searchParams?.toString() ?? ""}`;
  }


  return { pathname, router, params, searchParams, setParams, setSearchParams, getRoute } as const;
}

