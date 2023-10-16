import styles from "./MainAdminPage.module.css";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../AdminList";
import { useAuth } from "../../../Authorization/Auth";
import { Forbidden } from "../../NotFoundPage/ForbiddenPage";

export const MainAdminPage = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const notAdmin =
    !isAuthenticated || (isAuthenticated && !isAdmin(user!.email));
  return (
    <>
      {notAdmin ? (
        <Forbidden />
      ) : (
        <div className={styles.main}>
          <div className={styles.title}>😎 Admin panel</div>
          <div className={styles.functions}>
            <button onClick={() => navigate("/admin/addConcert")}>
              ➕ Add a concert
            </button>
            <button onClick={() => navigate("/admin/concerts")}>
              📚 Show all concerts
            </button>
            <button onClick={() => navigate("/admin/addPromocode")}>
              ➕ Add a promocode
            </button>
            <button onClick={() => navigate("/admin/promocodes")}>
              📚 Show all promocodes
            </button>
          </div>
        </div>
      )}
    </>
  );
};
