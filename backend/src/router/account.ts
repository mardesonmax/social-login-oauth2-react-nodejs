import { Router } from "express";
import { FacebookAuthController } from "../modules/account/useCases/facebookAuth/FacebookAuthController";
import { GoogleAuthController } from "../modules/account/useCases/googleAuth/GoogleAuthController";

const accountRouter = Router();

const googleAuthController = new GoogleAuthController();

const facebookAuthController = new FacebookAuthController();

accountRouter.post("/auth/google", googleAuthController.handle);

accountRouter.post("/auth/facebook", facebookAuthController.handle);

export { accountRouter };
