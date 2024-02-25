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
				next();
			})
			.catch((error: Error) => {
				logger.error(error);
				res.status(401).send("Unauthorized");
			});
	} else {
		logger.warn("No authorization header found.");
		next();
	}
};

export default TokenReaderMiddleware;
