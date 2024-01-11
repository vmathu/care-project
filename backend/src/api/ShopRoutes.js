const express = require("express");
const router = express.Router();
const { ShopService } = require("../services");

const shopService = new ShopService();
// Get all shops
router.get("/", async (req, res) => {
	try {
		const shops = await shopService.getAllShops();
		res.json(shops);
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
});

// Get shop by ID
router.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const shop = await shopService.getShopById(id);
		if (shop) {
			res.json(shop);
		} else {
			res.status(404).json({ error: "Shop not found" });
		}
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
});

module.exports = router;
