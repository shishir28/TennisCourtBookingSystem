import rateLimit from "express-rate-limit";

const rateLimitMiddleware = rateLimit({
	windowMs: 1500,
	max: 15,
});

export default rateLimitMiddleware;
