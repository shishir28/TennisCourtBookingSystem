import * as express from "express";
import { CheckoutRequest, CheckoutResponse } from "../domain/stripe.model";
import { BookingService } from "../businessServices/booking.service";
import { Booking } from "../domain/tenniscourt.model";
import { logger } from "../infrastructure";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export class CheckoutController {
	private bookingService: BookingService;

	constructor() {
		this.bookingService = new BookingService();
	}

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
			checkoutRequest.userId = request["current-user-Id"];
			const booking = await this.bookingService.createBooking(checkoutRequest);
			const sessionConfig = this.setupSessionConfig(checkoutRequest, booking);
			const session = await stripe.checkout.sessions.create(sessionConfig);
			const checkoutResponse: CheckoutResponse = {
				stripeCheckoutSessionId: session.id,
				stripePublicKey: process.env.STRIPE_PUBLIC_KEY,
			};
			return response.status(200).json(checkoutResponse);
		} catch (error) {
			logger.error(error);
			return response.status(500).send("Stripe checkout failed.");
		}
	}

	setupSessionConfig(info: CheckoutRequest, booking: Booking) {
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
			client_reference_id: `${info.userId}--${booking.id}`,
			mode: "subscription",
		};
		return sessionConfig;
	}
}
