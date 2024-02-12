import * as bodyParser from "body-parser";
import * as path from "path";
import serveStatic from "serve-static";
import express from "express";
import cors from "cors";

import { TennisCourtController } from "./tenniscourt.controller";
import { CheckoutController } from "./checkout.controller";
import { AuthController } from "./auth.controller";

class API {
	public api: express.Express;
	constructor() {
		this.api = express();
		this.configureMiddlewares();
		this.mountRoutes();
	}
	private mountRoutes(): void {
		const publicDir = path.join(path.resolve(__dirname, "../public"));
		this.api.use("/", serveStatic(path.resolve(publicDir)));
		this.api.use(
			"/favicon.ico",
			serveStatic(path.resolve(publicDir, "favicon.ico"))
		);

		const router = express.Router();
		let authController = new AuthController();
		authController.addRoutes(router);

		let tennisCourtController = new TennisCourtController();
		tennisCourtController.addRoutes(router);

		let checkoutController = new CheckoutController();
		checkoutController.addRoutes(router);

		router.get("/health", (_, res) => {
			res.status(200).send({ success: true });
		});
		router.get("/", (_, res) => {
			res.status(200).send("Not found");
		});

		router.get("*", (_, res) => {
			res.status(404).send({ success: true });
		});

		this.api.use("/", router);
	}

	private configureMiddlewares(): void {
		this.api.use(cors());
		this.api.use(
			bodyParser.urlencoded({
				extended: true,
			})
		);

		this.api.use(bodyParser.json());
		this.api.use(function (err, _req, _res, _next) {
			console.error(err.stack);
		});
	}
}

export default new API().api;
