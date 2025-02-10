import styles from "../Appbar.module.css";
import Image from "next/image";
import { NavigationLink } from "../link";

type AppLogoProps = {
  title?: string;
};

export const AppLogo: React.FC<AppLogoProps> = ({ title = "Anasayfa" }) => {
  return (
    <NavigationLink
      href='/'
      title={title}
      style={{
        display: "flex",
        alignItems: "center",
        zIndex: 1,
      }}
    >
      <>
        <Image
          src='/logo.jpeg'
          alt='logo'
          height={52}
          width={146}
          className={styles.logo}
          priority
        />
      </>
    </NavigationLink>
  );
};
