import {
  Link,
  useSearchParams,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./Header.module.css";

type FormData = {
  search: string;
};

export const Header = () => {
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
        <form onSubmit={event => void handleSubmit(submitForm)(event)}>
          <input
            {...register("search")}
            type="text"
            placeholder="Search concert🔍"
            defaultValue={criteria}
          />
          <button type="submit" style={{ margin: 5 }}>Search</button>
        </form>
      </div>
      <button onClick={() => navigate('/booked')} className={styles.bookedButton}>🎫 Booked tickets</button>
      <Link to="./admin" className={styles.signIn}>
      🧑 Sign In
      </Link>
    </div>
  );
};
