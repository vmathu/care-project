const express = require("express");
const cors = require("cors");
const RespondStatus = require("./utils/ResponedData").RespondStatus;

const { User, Rating } = require("./api");
const { Shop } = require("./api");

module.exports = async (app) => {
	app.use(cors());
	app.use(express.json());

	User(app);
	Rating(app);
	app.use("/shop", Shop);

	app.use((req, res, next) => {
		res.status(RespondStatus.NOT_FOUND).json({ message: "API not found" });
	});
};
