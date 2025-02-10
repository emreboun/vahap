export interface NavLinkProps {
  title: string;
  href: string;
  external?: boolean;
}

export const NAV_LINKS = [
  {
    title: "Eğitimler",
    href: "/egitimler",
    external: false,
  },
  {
    title: "Hakkımda",
    href: "/hakkimda",
    external: false,
  },
];
