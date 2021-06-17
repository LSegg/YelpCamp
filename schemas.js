const Joi = require('joi');

module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required(),
        image: Joi.string().required(),
        price: Joi.number().required().min(0),
        description: Joi.string().required(),
        location: Joi.string().required()
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().min(0).max(5).required(),
        body: Joi.string().required()
    }).required()
});