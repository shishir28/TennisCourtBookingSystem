export interface CheckoutRequest {
	courtId: string;
	slotId: string;
	callbackUrl: string;
}

export interface CheckoutResponse {
	stripeCheckoutSessionId: string;
	stripePublicKey: string;
}
