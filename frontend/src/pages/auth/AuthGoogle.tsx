import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = import.meta.env.VITE_APP_GOOGLE_CLIENT_SECRET;
const REDIRECT_URI_GOOGLE = import.meta.env.VITE_APP_REDIRECT_URI_GOOGLE;

interface TokenResponse {
  access_token: string;
  expires_in: number;
  id_token: string;
}

export function AuthGoogle() {
  const navigate = useNavigate();

  useEffect(() => {
    const paramsURL = new URLSearchParams(location.search);

    const code = paramsURL.get("code");

    // trocar code por access_token

    const baseURL = "https://oauth2.googleapis.com/token";

    const configs = {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      code: String(code),
      grant_type: "authorization_code",
      redirect_uri: REDIRECT_URI_GOOGLE,
    };

    const params = new URLSearchParams(configs);

    fetch(`${baseURL}?${params}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then(async (response) => {
        const data = (await response.json()) as TokenResponse;

        if (data.id_token) {
          const responseUser = await fetch(
            "http://localhost:3333/account/auth/google",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ idToken: data.id_token }),
            }
          );

          const res = await responseUser.json();

          localStorage.setItem("auth-user-token", res.accessToken);

          navigate("/");
        }
      })
      .catch((error) => {
        console.log("error ao logar com");
      });

    console.log(location.hash.replace("#", ""));
  }, []);

  return null;
}
