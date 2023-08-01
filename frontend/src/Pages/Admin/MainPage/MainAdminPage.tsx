import styles from "./MainAdminPage.module.css";
import { useNavigate } from "react-router-dom";

export const MainAdminPage = () => {

    const navigate = useNavigate();

  return (
    <div className={styles.main}>
        <div className={styles.title}>😎 Admin panel</div>
        <div className={styles.functions}>
           <button onClick={() => navigate("/admin/addConcert")}>➕ Add a concert</button>
           <button onClick={() => navigate("/admin/concerts")}>📚 Show all concerts</button>
           <button onClick={() => navigate("/admin/addPromocode")}>➕ Add a promocode</button>
           <button onClick={() => navigate("/admin/promocodes")}>📚 Show all promocodes</button>
        </div>
    </div>
  );
};
