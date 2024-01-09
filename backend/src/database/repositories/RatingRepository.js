const { RatingModel } = require('../models');

class RatingRepository  {
    async save({orderId, star, comment, images}) {
        try {
            console.log("Repository - save: ", images)
            const files = images.map(file => ({ _id: file.id }));
            const rating = new RatingModel({id_order: orderId, rating: star, comment, file: files});
            const result = await rating.save();
            return result;
        } catch (err) {
            console.log('RatingRepository.saveRating', err);
        }
    }

    async isExist({orderId}) {
        try {
            const rating = await RatingModel.findOne({ id_order: orderId });
            if (rating) {
                return true;
            }
            return false;
        } catch (err) {
            console.log('RatingRepository.isExist', err);
        }
    }

    async getRatingByOrderId({orderId}) {
        try {
            const rating = await RatingModel.findOne({ id_order: orderId });
            return rating;
        } catch (err) {
            console.log('RatingRepository.getRatingByOrderId', err);
        }
    }
}

module.exports = RatingRepository;