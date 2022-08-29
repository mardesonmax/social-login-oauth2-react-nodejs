import styles from "./styles.module.scss";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;
const REDIRECT_URI_GOOGLE = import.meta.env.VITE_APP_REDIRECT_URI_GOOGLE;

const FACEBOOK_CLIENT_ID = import.meta.env.VITE_APP_FACEBOOK_CLIENT_ID;
const REDIRECT_URI_FACEBOOK = import.meta.env.VITE_APP_REDIRECT_URI_FACEBOOK;

export function SignIn() {
  function loginGoogle() {
    const baseURL = "https://accounts.google.com/o/oauth2/v2/auth";

    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: REDIRECT_URI_GOOGLE,
      response_type: "code",
      scope: "email profile",
    });

    window.open(`${baseURL}?${params}`, "_self");
  }

  function loginFacebook() {
    const baseURL = "https://www.facebook.com/v14.0/dialog/oauth";

    const params = new URLSearchParams({
      client_id: FACEBOOK_CLIENT_ID,
      redirect_uri: REDIRECT_URI_FACEBOOK,
      state: "my_secrete_token",
    });

    window.open(`${baseURL}?${params}`, "_self");
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles["login-social"]}>
          <button onClick={loginGoogle}>Login com google</button>
          <button onClick={loginFacebook}>Login com facebook</button>
        </div>
      </div>
    </div>
  );
}
