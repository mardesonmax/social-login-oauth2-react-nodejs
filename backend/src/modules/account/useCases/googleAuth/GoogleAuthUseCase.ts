import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

interface GoogleAuthParams {
  idToken: string;
}

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

export class GoogleAuthUseCase {
  constructor() {}

  private async verify(idToken: string) {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    return payload;
  }

  async execute(data: GoogleAuthParams) {
    try {
      const user = await this.verify(data.idToken);

      // create or find user in db

      // return jwt access token

      if (user) {
        const accessToken = jwt.sign({}, "secret_token", {
          subject: user.sub,
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
