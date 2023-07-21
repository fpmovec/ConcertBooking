import React from "react";
import { PageTitle } from "./PageTitle";
import styles from './Page.module.css'

interface Props {
  title?: string;
  children: React.ReactNode;
}

export const Page = ({ title, children }: Props) => (
  <div className={styles.page}>
    {title && <PageTitle>{title}</PageTitle>}
    {children}
  </div>
);
