import { useSearchParams } from "react-router-dom";

export const Thanks = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  return <h2 style={{ textAlign: "center", fontSize: 35}}>Thank you for {status}!</h2>;
};
