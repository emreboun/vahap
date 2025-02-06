import { Tooltip } from "@mui/material";
import Link from "next/link";
import React from "react";

//import { useTranslation } from "../../../../common/i18n/client";

type NavigationLinkProps = {
  href: string;
  title?: string;
  children: React.ReactNode;
  passHref?: boolean;
  style?: React.CSSProperties;
  className?: string;
  //sx?: any;
};

export const NavigationLink: React.FC<NavigationLinkProps> = ({
  href,
  title,
  passHref = false,
  children,
  style,
  className,
  ...props
}) => {
  return (
    <Tooltip title={title}>
      <Link
        href={href}
        className={className}
        style={{
          //alignSelf: "stretch",
          display: "flex",
          alignItems: "stretch",
          justifyContent: "stretch",
          ...style,
        }}
        {...props}
        //aria-labelledby={"asd"}
        passHref={passHref}
        legacyBehavior={passHref}
      >
        {children}
      </Link>
    </Tooltip>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  passHref?: boolean;
  external?: boolean;
}

export const NavLink: React.FC<NavLinkProps> = ({
  href,
  passHref = true,
  external = false,
  children,
}) => {
  //const { t } = useTranslation();

  if (external) {
    return <>{children}</>;
  }

  return (
    <Link
      href={href}
      //aria-labelledby={"asd"}
      passHref={passHref}
      legacyBehavior={passHref}
      //scroll={true}
    >
      {children}
    </Link>
  );
};

/* 
export const NavLink: React.FC<NavigationLinkProps> = ({
  href,
  title,
  passHref = false,
  children,
  //sx = { fontSize: 20 },
}) => {
  //const { t } = useTranslation();

  return (
    <NavigationLink href={href} title={title} passHref={passHref}>
      <Typography
        component="h1"
        sx={{ fontSize: 20, display: { xs: "none", sm: "block" } }}
      >
        {children}
      </Typography>
    </NavigationLink>
  );
};
 */
