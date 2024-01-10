const { CONNTECTION_STRING } = require("../config");
const { RatingService } = require("../services");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const crypto = require("crypto");
const path = require("path");

var storage = new GridFsStorage({
	url: CONNTECTION_STRING,
	file: (req, file) => {
		return new Promise((resolve, reject) => {
			crypto.randomBytes(16, (err, buf) => {
				if (err) {
					return reject(err);
				}
				const filename = buf.toString("hex") + path.extname(file.originalname);
				const fileInfo = {
					filename: filename,
					bucketName: "images",
				};
				resolve(fileInfo);
			});
		});
	},
});

const upload = multer({ storage });

const conn = mongoose.createConnection(CONNTECTION_STRING);

let gfs, gridfsBucket;

conn.once("open", () => {
	gfs = Grid(conn.db, mongoose.mongo);
	gfs.collection("images");
	gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
		bucketName: "images",
	});
});

module.exports = (app) => {
	const service = new RatingService();

	app.post("/rating", upload.array("images", 5), async (req, res) => {
		const images = req.files || [];

		try {
			const { orderId, star, comment } = req.body;
			if (!orderId || !star) {
				throw { message: "Thiếu thông tin ", status: RespondStatus.BAD_REQUEST };
			}

			console.log("Routes - Rating: ", req.files);

			const result = await service.addRating({ orderId, star, comment, images });

			return res.json(result);
		} catch (err) {
			res.json({ data: "fail", message: err.message, status: err.status });
		}
	});

	app.post("/rating/is-exist", async (req, res) => {
		try {
			const { orderId } = req.body;

			if (!orderId) {
				throw { message: "Thiếu thông tin ", status: RespondStatus.BAD_REQUEST };
			}

			const result = await service.isExist({ orderId });
			return res.json(result);
		} catch (err) {
			res.json({ data: "fail", message: err.message, status: err.status });
		}
	});

	app.post("/rating/get-rating", async (req, res) => {
		try {
			const { orderId } = req.body;

			if (!orderId) {
				throw { message: "Thiếu thông tin ", status: RespondStatus.BAD_REQUEST };
			}

			const result = await service.getRatingByOrderId({ orderId });

			return res.json(result);
		} catch (err) {
			res.json({ data: "fail", message: err.message, status: err.status });
		}
	});

	app.get("/images", async (req, res) => {
		try {
			const files = await gfs.files.find().toArray();
			if (!files || files.length === 0) {
				throw { message: "No files exist", status: RespondStatus.NOT_FOUND };
			}

			return res.json(files);
		} catch (err) {
			res.json({ data: "fail", message: err.message, status: err.status });
		}
	});

	app.get("/images/:imgId", async (req, res) => {
		try {
			const id = new mongoose.Types.ObjectId(req.params.imgId);
			const file = await gfs.files.findOne({ _id: id });
			if (!file) {
				throw { message: "No files exist", status: RespondStatus.NOT_FOUND };
			}

			const readstream = gridfsBucket.openDownloadStream(file._id);
			readstream.pipe(res);
		} catch (err) {
			res.json({ data: "fail", message: err.message, status: err.status });
		}
	});
};
