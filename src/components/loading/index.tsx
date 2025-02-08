import Image from "next/image";
import styles from "./loading.module.css";

export const Loading: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className={styles.preloader}>
        <div id='ctn-preloader' className={styles.ctnPreloader}>
          <div className={styles.roundSpinner}>
            <div className={styles.spinner}></div>
            <div className={styles.text}>
              <Image src='/logo.png' alt='logo' height={33} width={112} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
