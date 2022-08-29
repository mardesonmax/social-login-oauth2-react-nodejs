import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FACEBOOK_CLIENT_ID = import.meta.env.VITE_APP_FACEBOOK_CLIENT_ID;
const FACEBOOK_CLIENT_SECRET = import.meta.env.VITE_APP_FACEBOOK_CLIENT_SECRET;
const REDIRECT_URI_FACEBOOK = import.meta.env.VITE_APP_REDIRECT_URI_FACEBOOK;

interface TokenResponse {
  access_token: string;
}

export function AuthFacebook() {
  const navigate = useNavigate();

  useEffect(() => {
    const paramsURL = new URLSearchParams(location.search);

    const code = paramsURL.get("code");

    if (code) {
      const baseURL = "https://graph.facebook.com/v14.0/oauth/access_token";

      const params = new URLSearchParams({
        client_id: FACEBOOK_CLIENT_ID,
        client_secret: FACEBOOK_CLIENT_SECRET,
        redirect_uri: REDIRECT_URI_FACEBOOK,
        code,
      });

      fetch(`${baseURL}?${params}`, {
        method: "GET",
      })
        .then(async (response) => {
          const data = (await response.json()) as TokenResponse;

          if (data.access_token) {
            const responseUser = await fetch(
              "http://localhost:3333/account/auth/facebook",
              {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ access_token: data.access_token }),
              }
            );

            const res = await responseUser.json();

            localStorage.setItem("auth-user-token", res.accessToken);

            navigate("/");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return null;
}
