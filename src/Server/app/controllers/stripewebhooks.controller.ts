import * as express from "express";
import { logger } from "../infrastructure";
import stripe from "stripe";
import { BookingService } from "../businessServices/booking.service";

export class StripeWebhooksController {
	// public addRoutes(api: express.Router) {
	// 	api.post(
	// 		"/stripeWebhooks",
	// 		bodyParser.raw({ type: "application/json" }),
	// 		(request: express.Request, response: express.Response) =>
	// 			this.consumeStripeEvents(request, response)
	// 	);
	// }

	async consumeStripeEvents(
		request: express.Request,
		response: express.Response
	) {
		try {
			const bookingService = new BookingService();
			const stripeSignature = request.headers["stripe-signature"];

			const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
			const event = stripe.webhooks.constructEvent(
				request.body,
				stripeSignature,
				endpointSecret
			);
			if (event.type === "checkout.session.completed") {
				const session = event.data.object;
				const clientReferenceId = session.client_reference_id;
				const bookingId = clientReferenceId.split("--")[1];
				bookingService.updateBooking(bookingId).then(() => {});
			}
			return response.status(200).json({ received: true });
		} catch (error) {
			console.log(error);
			logger.error(error);
			return response.status(500).send("stripe checkout failed.");
		}
	}
}
