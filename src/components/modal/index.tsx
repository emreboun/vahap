import { Paper } from "@mui/material";
import styles from "./Modal.module.css";

import React from "react";

export type ModalProps = {
  enabled: boolean;
  children: React.ReactNode;
  onClose?: () => void;
};

export const Modal: React.FC<ModalProps> = ({ children, onClose, enabled }) => {
  return (
    <>
      <div
        className={`
          ${styles.modal} 
          ${styles.orientation} 
          ${styles.center} 
          ${enabled && styles.enabled}
        `}
      >
        <Paper className={styles.paper}>{children}</Paper>
      </div>

      {enabled && <div className={styles.backdrop} onClick={onClose} />}
    </>
  );
};

export default Modal;
