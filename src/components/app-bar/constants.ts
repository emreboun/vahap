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
  { title: "Setler", href: "/egitim-setleri", external: false },
  { title: "Etkinlikler", href: "/etkinlikler", external: false },
  {
    title: "Hakkımda",
    href: "/hakkimda",
    external: false,
  },
  //{ title: "Sıkça Sorulan Sorular", href: "/sss", external: false },
];
