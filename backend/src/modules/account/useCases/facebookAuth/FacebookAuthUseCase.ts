import axios from "axios";
import jwt from "jsonwebtoken";

interface GoogleAuthParams {
  access_token: string;
}

const apiFacebook = axios.create({
  baseURL: "https://graph.facebook.com",
});

const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID;
const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET;

export class FacebookAuthUseCase {
  constructor() {}

  private async verify(access_token: string) {
    try {
      const responseToken = await apiFacebook.get("/oauth/access_token", {
        params: {
          client_id: FACEBOOK_CLIENT_ID,
          client_secret: FACEBOOK_CLIENT_SECRET,
          grant_type: "client_credentials",
        },
      });

      await apiFacebook.get("/debug_token", {
        params: {
          input_token: access_token,
          access_token: responseToken.data.access_token,
        },
      });

      const user = await apiFacebook.get(`/v14.0/me`, {
        params: {
          access_token,
          fields: "id,email,name",
        },
      });

      return user.data;
    } catch (error) {
      console.log(error);
    }
  }

  async execute(data: GoogleAuthParams) {
    try {
      const user = await this.verify(data.access_token);

      // create or find user in db

      // return jwt access token

      console.log(user);

      if (user) {
        const accessToken = jwt.sign({}, "secret_token", {
          subject: user.id,
        });

        return {
          accessToken,
        };
      }
    } catch (err) {
      console.log(err);
    }
  }
}
