import * as express from "express";

import { TennisCourtService } from "../businessServices/tenniscourt.service";
import { TennisCourt } from "../domain/tenniscourt.model";
import { Mapper } from "@automapper/core";
import { AutoMapperBootStrapper } from "../mappings/autoMapperBootStrapper";
import { TennisCourtViewModel } from "./viewModels/tennisCourtViewModel";

export class TennisCourtController {
	private mapper: Mapper;
	private tennisCourtService: TennisCourtService;
	public addRoutes(api: express.Router) {
		api.get(
			"/api/tenniscourt",
			(request: express.Request, response: express.Response) =>
				this.getAllCourts(request, response)
		);
	}

	constructor() {
		this.mapper = new AutoMapperBootStrapper().bootstrap();
		this.tennisCourtService = new TennisCourtService();
	}

	getAllCourts(_: express.Request, response: express.Response) {
		this.tennisCourtService
			.getAllTennisCourtsAndAvailability()
			.then((tennisCourts: TennisCourt[]) => {
				let result = this.mapper.mapArray(
					tennisCourts,
					TennisCourt,
					TennisCourtViewModel
				);
				return response.status(200).send(result);
			})
			.catch((error: Error) => {
				return response.status(500).send(error);
			});
	}
}
