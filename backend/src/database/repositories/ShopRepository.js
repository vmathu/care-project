const { ShopModel } = require("../models");

class ShopRepository {
	async getAllShops() {
		// Query all shops from the collection
		try {
			const shops = await ShopModel.find({});
			return shops;
		} catch (e) {
			console.log("ShopRepository.getAllShops", e);
		}
	}

	async getShopById(id) {
		// Query a shop by ID from the collection
		try {
			const shop = await ShopModel.findOne({ _id: id });
			return shop;
		} catch (e) {
			console.log("ShopRepository.getShopById", e);
		}
	}
}

module.exports = ShopRepository;
