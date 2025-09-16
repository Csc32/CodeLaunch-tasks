import app from "./src/libs/app.js";
const server = {
	port: 3000,
};

app.listen(server.port, (req, res) => {
	console.log(`Server running at port: ${server.port}`);
});
