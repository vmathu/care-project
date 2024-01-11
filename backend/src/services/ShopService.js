const { ShopRepository } = require("../database");

class ShopService {
	constructor() {
		this.shopRepository = new ShopRepository();
	}

	getAllShops() {
		return this.shopRepository.getAllShops();
	}

	getShopById(id) {
		return this.shopRepository.getShopById(id);
	}
}

module.exports = ShopService;
