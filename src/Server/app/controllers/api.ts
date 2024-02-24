import express from "express";

import { TennisCourtController } from "./tenniscourt.controller";
import { CheckoutController } from "./checkout.controller";
import { AuthController } from "./auth.controller";

class API {
	constructor() {}

	public mountRoutes(app): void {
		const router = express.Router();
		let authController = new AuthController();
		authController.addRoutes(router);

		let tennisCourtController = new TennisCourtController();
		tennisCourtController.addRoutes(router);

		let checkoutController = new CheckoutController();
		checkoutController.addRoutes(router);

		app.use("/", router);
	}
}

export default new API();
