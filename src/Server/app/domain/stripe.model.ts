export interface CheckoutRequest {
	courtId: string;
	epochTimestampInSeconds: number;
	callbackUrl: string;
	client_reference_id: string;
}

export interface CheckoutResponse {
	stripeCheckoutSessionId: string;
	stripePublicKey: string;
}
