import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import api from "./controllers/api";
import cors from "cors";
import * as path from "path";
import serveStatic from "serve-static";
import helmet from "helmet";
import { errorHandler, rateLimiter, tokenReader } from "./infrastructure";
import { StripeWebhooksController } from "./controllers/stripewebhooks.controller";

const initServer = () => {
	const port = process.env.PORT || 8080;
	const app = express();
	app.use((_: Request, res: Response, next) => {
		res.header(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept, Credentials, Set-Cookie"
		);
		res.header("Access-Control-Allow-Credentials", "true");
		res.header(
			"Access-Control-Allow-Headers",
			"Content-Type, Accept, Access-Control-Allow-Credentials, Cross-Origin"
		);
		res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
		next();
	});

	app.use(
		bodyParser.urlencoded({
			extended: true,
		})
	);
	//stripe webhooks are special and need to be handled differently
	let stripeWebhooksController = new StripeWebhooksController();

	app
		.route("/stripeWebhooks")
		.post(
			bodyParser.raw({ type: "application/json" }),
			stripeWebhooksController.consumeStripeEvents
		);

	app.use(bodyParser.json());
	app.use(function (err, _req, _res, _next) {
		console.error(err.stack);
	});
	app.use(cors());
	app.use(tokenReader);
	app.use(errorHandler);
	app.use(rateLimiter);

	const publicDir = path.join(path.resolve(__dirname, "./public"));
	app.use("/", serveStatic(path.resolve(publicDir)));
	app.use("/favicon.ico", serveStatic(path.resolve(publicDir, "favicon.ico")));

	app.use(helmet());
	api.mountRoutes(app);

	app.get("/health", (_, res) => {
		res.status(200).send({ success: true });
	});

	app.get("*", (_, res) => res.status(404).send("Not Found"));

	app.listen(port, () => {
		console.info(`API Server listening on port ${port}...`);
	});
};

export default initServer;
