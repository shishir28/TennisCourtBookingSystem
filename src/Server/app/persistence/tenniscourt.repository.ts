import * as fs from "fs";
import { TennisCourt } from "../domain/tenniscourt.model";
import path from "path";

export class TennisCourtRepository {
	async ListAllTennisCourts(): Promise<TennisCourt[]> {
		const fileName = path.join(
			path.resolve(__dirname, "../public/tenniscourts.json")
		);
		const jsonData = fs.readFileSync(fileName, "utf-8");
		const parsedData = JSON.parse(jsonData);
		return parsedData;
	}
}
