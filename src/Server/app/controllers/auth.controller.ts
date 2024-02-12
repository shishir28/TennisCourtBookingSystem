import * as express from "express";
import { AuthService } from "../businessServices/auth.service";
import { SignUpRequest, SignUpResponse } from "../domain/auth.model";

export class AuthController {
	private authService: AuthService;

	constructor() {
		this.authService = new AuthService();
	}

	public addRoutes(api: express.Router) {
		api.post(
			"/api/signup",
			(request: express.Request, response: express.Response) =>
				this.signup(request, response)
		);
	}

	async signup(request: express.Request, response: express.Response) {
		try {
			const signUpRequest: SignUpRequest = request.body;
			this.authService
				.signup(signUpRequest.email, signUpRequest.password)
				.then((userRecord) => {
					const signUpResponse: SignUpResponse = {
						userId: userRecord.uid,
						email: userRecord.email,
					};
					return response.status(200).json(signUpResponse);
				});
		} catch (error) {
			console.log(error);
			return response.status(500).send("stripe checkout failed.");
		}
	}
}
