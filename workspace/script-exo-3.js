let db = connect("mongodb://root:test123@localhost:27017?authSource=admin");

db = db.getSiblingDB('sample_mflix');

const result = db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $lt: 5 }
    }
  },
  {
    $unwind: "$directors"
  },
  {
    $group: {
      _id: "$directors",
      movieCount: { $sum: 1 }
    }
  },
  {
    $sort: { movieCount: -1 }
  },
  {
    $limit: 10
  }
]).toArray();

db.lame_directors.deleteMany({});
db.lame_directors.insertMany(result);

const lameDirectors = db.lame_directors.find().toArray();
console.log(lameDirectors);