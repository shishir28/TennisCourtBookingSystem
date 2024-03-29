import CustomError from "./customError";

class BadRequestError extends CustomError {
	constructor(message: string, code: Number = 400, details: Object = {}) {
		super(message, code, details);
		this.name = "BadRequestError";
	}
}

export default BadRequestError;
