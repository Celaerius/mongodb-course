let db = connect("mongodb://root:test123@localhost:27017?authSource=admin");
// USE technocite
db = db.getSiblingDB('sample_mflix');

const movies = db.movies
.find({
    //cast: "Keanu Reeves",
    //genres: "Comedy",
    //year: { $gte: 2002, $lte: 2008 },
    //$and: [
    //    { cast: { $eq: "Chris O'Donnell" } },
    //    { cast: { $eq: "Matt Damon" } }
    //],
    //$or: [
    //{directors: { $eq: "Neil Burger" }},
    //{directors: { $eq: "Tony Scott" }}
    //],

    //"imdb.rating": { $gte: 8.0 }
    //"tomatoes.critic.rating": { $gte: 8 },

    "realeased.date": { $exists: false }

})

console.log(movies);

const latestmovies = db.movies
.find({})
.sort({ released: 1 })
.limit(1)

//console.log(latestmovies);

