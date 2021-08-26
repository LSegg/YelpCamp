const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const dotenv = require('dotenv').config();
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';


mongoose.connect(dbUrl, { // this object prevents DeprecationWarning
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = arr => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
    // await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const images = [
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
            },
            {
                url: 'https://res.cloudinary.com/lsegg/image/upload/v1624498507/YelpCamp/p3lc8tnstzk3ylinfyza.jpg',
                filename: 'YelpCamp/p3lc8tnstzk3ylinfyza'
            },
            {
                url: 'https://res.cloudinary.com/lsegg/image/upload/v1629670771/YelpCamp/tdjzgcii1zewvlendzh9.jpg',
                filename: 'YelpCamp/tdjzgcii1zewvlendzh9'
            },
            {
                url: 'https://res.cloudinary.com/lsegg/image/upload/v1629670772/YelpCamp/kuyd9cm960eglbbvblgj.jpg',
                filename: 'YelpCamp/kuyd9cm960eglbbvblgj'
            },
            {
                url: 'https://res.cloudinary.com/lsegg/image/upload/v1629671351/YelpCamp/b4mig9at9thhqow6yh2u.jpg',
                filename: 'YelpCamp/b4mig9at9thhqow6yh2u'
            },
            {
                url: 'https://res.cloudinary.com/lsegg/image/upload/v1629688572/YelpCamp/kpcmbnobh13asqgugxer.jpg',
                filename: 'YelpCamp/kpcmbnobh13asqgugxer'
            },
        ];
        const randomImageIndex = Math.floor(Math.random() * 9);
        const authors = ['612715bc134f5c00164ea803', '61271729134f5c00164ea804', '61271775134f5c00164ea805'];
        const randomDescriptionIndex = Math.floor(Math.random() * 2);
        const descriptions = ['Beautiful and quiet RV Park. We have all full hook ups, camper cabins and tent sites. There are many outdoor activities.',
            'When you stay here you have three generations of active outdoor-loving family to help direct you to the best fishing holes, fishing guides, restaurants, cultural exhibits, and more.We strive to treat everyone to a special experience with warm hospitality. We have a blast taking our guests on hikes, hosting delicious Saturday evening potlucks, and finding ways to make your adventure more enjoyable. Travelers from all over have found a home away from home.',
            'With tent camping sites, full hookup RV sites, full service lodging and cabins we are designed to create the perfect RV, camping or vacation experience.',
            'This camp offers a very unique camping experience. We are located on 20 acres of private land. A combination of natural beauty and and luxury tents sets the scene. Each site is designed lovingly with great care to provide the best possible experience for our guests. Take delight in the spectacular views we offer and checkout some of the many beautiful hidden trails right in our backyard that only the locals know about.',
            'Ours is a good old fashioned full hook-up camp site. We offer daily/weekly and monthly options to serve your vacation or stay-cation needs.',
        ];
        const randomAuthorIndex = Math.floor(Math.random() * 4);
        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            images: images[randomImageIndex],
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            price,
            description: descriptions[randomDescriptionIndex],
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            author: authors[randomAuthorIndex]
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
    console.log("Database disconnected");
});
