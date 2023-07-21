import React from "react";
import styles from "./Page.module.css";

interface Props {
  children: React.ReactNode;
}

export const PageTitle = ({ children }: Props) => (
  <h2 className={styles.pageTitle}>{children}</h2>
);
