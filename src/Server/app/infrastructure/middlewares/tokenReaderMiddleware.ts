import { Request, Response, NextFunction } from "express";
import { AppContext } from "../../AppContext";
import logger from "../logger";

const TokenReaderMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const appContext = AppContext.getInstance();
	const authorizationHeader = req.headers.authorization;
	if (!!authorizationHeader) {
		appContext.auth
			.verifyIdToken(authorizationHeader.split(" ")[1])
			.then((decodedToken: any) => {
				req["current-user-Id"] = decodedToken.uid;
				logger.info(`User ${decodedToken.uid} is authorized.`);
				next();
			})
			.catch((error: Error) => {
				logger.error(error);
				res.status(401).send("Unauthorized");
			});
	} else {
		next();
	}
};

export default TokenReaderMiddleware;
