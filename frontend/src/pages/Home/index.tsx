import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

export function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const access_token = localStorage.getItem("auth-user-token");

    if (!access_token) {
      navigate("/auth");
    }
  }, []);

  function logout() {
    localStorage.removeItem("auth-user-token");
    navigate("/auth");
  }

  return (
    <div className={styles.container}>
      <h1>Home</h1>
      <button onClick={logout}>Sair</button>
    </div>
  );
}
