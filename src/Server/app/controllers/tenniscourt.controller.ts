import * as express from "express";

import { TennisCourtService } from "../businessServices/tenniscourt.service";
import { TennisCourt } from "../domain/tenniscourt.model";

export class TennisCourtController {
	private tennisCourtService: TennisCourtService;
	public addRoutes(api: express.Router) {

		api.get(
			"/api/tenniscourt",
			(request: express.Request, response: express.Response) =>
				this.getAllCourts(request, response)
		);
	}

	constructor() {
		this.tennisCourtService = new TennisCourtService();
	}

	getAllCourts(_: express.Request, response: express.Response) {
		this.tennisCourtService
			.getAllTennisCourts()
			.then((tennisCourts: TennisCourt[]) => {
				let result = tennisCourts;
				// to do map it o respective view model
				return response.status(200).send(result);
			})
			.catch((error: Error) => {
				return response.status(500).send(error);
			});
	}
}
