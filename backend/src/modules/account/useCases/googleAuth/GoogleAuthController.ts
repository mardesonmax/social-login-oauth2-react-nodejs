import { Request, Response } from "express";
import { GoogleAuthUseCase } from "./GoogleAuthUseCase";

export class GoogleAuthController {
  async handle(request: Request, response: Response) {
    const googleAuthUseCase = new GoogleAuthUseCase();

    const { idToken } = request.body;

    const data = await googleAuthUseCase.execute({
      idToken,
    });

    response.json(data);
  }
}
