import express from "express";
import router from "../routes/routes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
app.use("/api/v1", router);
app.set("port", 3000);
export default app;