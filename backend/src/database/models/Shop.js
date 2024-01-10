const mongoose = require("mongoose");

const ShopSchema = new mongoose.Schema(
	{
		description: {
			type: String,
		},
		address: {
			street: String,
			district: String,
			city: String,
		},
		time: {
			open: {
				type: String,
				required: true,
			},
			close: {
				type: String,
				required: true,
			},
		},
		imgs: [
			{
				type: String,
			},
		],
		menu: {
			type: String,
		},
		price: {
			type: String,
			required: true,
		},
		rating: {
			type: Number,
			default: 0,
			required: true,
		},
		tag: [
			{
				type: String,
			},
		],
	},
	{
		versionKey: false,
	}
);

module.exports = mongoose.model("Shop", ShopSchema, "shops");
