const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', { // this object prevents DeprecationWarning
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = arr => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 350; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/lsegg/image/upload/v1624036639/YelpCamp/guervje6uz8kgzqxfpwd.jpg',
                    filename: 'YelpCamp/guervje6uz8kgzqxfpwd'
                },
                {
                    url: 'https://res.cloudinary.com/lsegg/image/upload/v1624036640/YelpCamp/ngcsayf7bhowbgdpbbsg.jpg',
                    filename: 'YelpCamp/ngcsayf7bhowbgdpbbsg'
                },
                {
                    url: 'https://res.cloudinary.com/lsegg/image/upload/v1624036641/YelpCamp/jgdc2hgbmgdy3ouvxsqz.jpg',
                    filename: 'YelpCamp/jgdc2hgbmgdy3ouvxsqz'
                },
                {
                    url: 'https://res.cloudinary.com/lsegg/image/upload/v1624036641/YelpCamp/c3mjgxycy29z4j7ozppa.jpg',
                    filename: 'YelpCamp/c3mjgxycy29z4j7ozppa'
                },
                {
                    url: 'https://res.cloudinary.com/lsegg/image/upload/v1624036644/YelpCamp/wir9ulsqup9gzsp7s4dy.jpg',
                    filename: 'YelpCamp/wir9ulsqup9gzsp7s4dy'
                }
            ],
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            price,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem nobis, nam vel voluptate porro tenetur deserunt consequuntur quas! Fuga, consequuntur? Natus minus nesciunt labore necessitatibus quae non quibusdam explicabo blanditiis!',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            author: '60ca5400b0308146009ee65e' // default user ID
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
    console.log("Database disconnected");
});
