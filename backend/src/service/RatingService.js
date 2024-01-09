const { RatingRepository } = require('../database')
const RespondData = require('../utils/ResponedData').RespondData;
const RespondStatus = require('../utils/ResponedData').RespondStatus;

class RatingService {
    constructor() {
        this.repository = new RatingRepository();
    }

    async addRating({orderId, star, comment, images}) {
        try {
            const rating = await this.repository.save({orderId, star, comment, images});
            console.log("Service - addRating: ", images)
            if (!rating)
                throw { message: 'Không thể tạo đánh giá', status: RespondStatus.INTERNAL_SERVER_ERROR }
            return RespondData('success', 'Tạo đánh giá thành công', RespondStatus.SUCCESS);
        } catch (err) {
            console.log('RatingService.addRating', err);
        }
    }

    async isExist({orderId}) {
        try {
            const rating = await this.repository.isExist({orderId});
            return rating;
        } catch (err) {
            console.log('RatingService.isExist', err);
        }
    }

    async getRatingByOrderId({orderId}) {
        try {
            const rating = await this.repository.getRatingByOrderId({orderId});
            return rating;
        } catch (err) {
            console.log('RatingService.getRatingByOrderId', err);
        }
    }

    async getImage({orderId, imgName}) {
        try {
            const image = await this.repository.getImage({orderId, imgName});
            return image;
        } catch (err) {
            console.log('RatingService.getImage', err);
        }
    }
}

module.exports = RatingService;