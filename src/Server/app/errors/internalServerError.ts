import CustomError from "./customError";

class InternalServerError extends CustomError {
	constructor(message: string, code: Number = 500, details: Object) {
		super(message, code, details);
		this.name = "InternalServerError";
	}
}

export default InternalServerError;
