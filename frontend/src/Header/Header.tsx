import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./Header.module.css";
import { useAuth } from "../Authorization/Auth";

type FormData = {
  search: string;
};

export const Header = () => {
  const { isAuthenticated, user, loading } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FormData>();
  const [searchParams] = useSearchParams();
  const criteria = searchParams.get("criteria") || "";

  const submitForm = ({ search }: FormData) => {
    navigate(`search?criteria=${search}`);
  };

  return (
    <div className={styles.header}>
      <Link to="./" className={styles.title}>
        ConcertBooking
      </Link>
      <div className={styles.inputGroup}>
        <form onSubmit={(event) => void handleSubmit(submitForm)(event)}>
          <input
            {...register("search")}
            type="text"
            placeholder="Search concert🔍"
            defaultValue={criteria}
          />
          <button type="submit" style={{ margin: 5 }}>
            Search
          </button>
        </form>
      </div>
      {isAuthenticated && (
        <div>
          <button
            onClick={() => navigate("/booked")}
            className={styles.bookedButton}
          >
            🎫 <span>Booked tickets</span>{" "}
          </button>
          <button
            onClick={() => navigate("/admin")}
            className={styles.bookedButton}
          >
            🎫 <span>Purchased tickets</span>
          </button>
        </div>
      )}

      {!loading &&
        (isAuthenticated ? (
          <div>
            <span style={{ marginRight: 5 }}>{user!.name}</span>
            <Link to="./signout" className={styles.signIn}>
              Sign Out
            </Link>
          </div>
        ) : (
          <div>
            <Link to="./signin" className={styles.signIn}>
              Sign In
            </Link>
          </div>
        ))}
    </div>
  );
};
