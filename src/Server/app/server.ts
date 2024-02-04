import api from "./controllers/api";

const initServer = () => {
	const port = process.env.PORT || 8080;
	api.listen(port, () => {
		console.info(`API Server listening on port ${port}...`);
	});
};

export default initServer;
