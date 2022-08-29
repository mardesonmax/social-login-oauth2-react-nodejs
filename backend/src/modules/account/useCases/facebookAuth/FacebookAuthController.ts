import { Request, Response } from "express";
import { FacebookAuthUseCase } from "./FacebookAuthUseCase";

export class FacebookAuthController {
  async handle(request: Request, response: Response) {
    const facebookAuthUseCase = new FacebookAuthUseCase();

    const { access_token } = request.body;

    const data = await facebookAuthUseCase.execute({
      access_token,
    });

    response.json(data);
  }
}
