import * as express from "express";
import { CheckoutRequest, CheckoutResponse } from "../domain/stripe.model";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export class CheckoutController {
	public addRoutes(api: express.Router) {
		api.post(
			"/api/checkout",
			(request: express.Request, response: express.Response) =>
				this.createCheckoutSession(request, response)
		);
	}

	async createCheckoutSession(
		request: express.Request,
		response: express.Response
	) {
		try {
			const checkoutRequest: CheckoutRequest = request.body;
			const sessionConfig = this.setupSessionConfig(checkoutRequest);

			const session = await stripe.checkout.sessions.create(sessionConfig);
			const checkoutResponse: CheckoutResponse = {
				stripeCheckoutSessionId: session.id,
				stripePublicKey: process.env.STRIPE_PUBLIC_KEY,
			};
			return response.status(200).json(checkoutResponse);
		} catch (error) {
			console.log(error);
			return response.status(500).send("stripe checkout failed.");
		}
	}

	setupSessionConfig(info: CheckoutRequest) {
		console.log(`${info.callbackUrl}/?purchaseResult=success`);
		console.log(`${info.callbackUrl}/?purchaseResult=failed`);
		let sessionConfig = {
			payment_method_types: ["card"],
			success_url: `${info.callbackUrl}/?purchaseResult=success`,
			cancel_url: `${info.callbackUrl}/?purchaseResult=failed`,
			line_items: [
				{
					price: "price_1Ogn7BCp0KjQmo6GOgthHY5e", // 10 dollar hard coded value for the time being
					quantity: 1, // we cant buy more than 1 session at time
				},
			],
			mode: "subscription",
		};
		return sessionConfig;
	}
}
