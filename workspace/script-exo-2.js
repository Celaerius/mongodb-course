let db = connect("mongodb://root:test123@localhost:27017?authSource=admin");
// USE technocite
db = db.getSiblingDB('sample_mflix');

// Augmente la note ranking de IMDB de 5 pour tous les films où joue 'Charlize Theron'
/* db.movies.updateMany(
  { "cast": "Charlize Theron" },
  { $inc: { "imdb.rating": 5 } }
); */

// Vérifie les modifications
/* const updatedMovies = db.movies.find(
  { "cast": "Charlize Theron" },
  { title: 1, "imdb.rating": 1 }
).toArray();

console.log(updatedMovies); */



// Supprime les films réaliser par 'Harald Zwart'
/* db.movies.deleteMany(
  { "directors": "Harald Zwart" }
); */

// Vérifie la suppression
/* const deletedMoviesCount = db.movies.countDocuments(
  { "directors": "Harald Zwart" }
);

console.log(`Nombre de films réalisés par Harald Zwart après suppression : ${deletedMoviesCount}`); */

// Ajouter l'acteur 'Key Key' au films "+1" et "Anamorph"
/* db.movies.updateMany(
  { title: { $in: ["+1", "Anamorph"] } },
  { $addToSet: { cast: "Key Key" } }
); */

// Vérifie les modifications
/* const modifiedMovies = db.movies.find(
  { title: { $in: ["+1", "Anamorph"] } },
  { title: 1, cast: 1 }
).toArray(); */
/* 
console.log(modifiedMovies); */

// Supprimez l'acteur "Keanu Reeves" de films "Matrix"
/* db.movies.updateMany(
  { title: "The Matrix" },
  { $pull: { cast: "Keanu Reeves" } }
); */

// Vérifie les modifications
/* const matrixMovie = db.movies.find(
  { title: "The Matrix" },
  { title: 1, cast: 1 }
).toArray();

console.log(matrixMovie); */

//Remplacez le titre "Jurassic Park" par le film "The Matrix"
db.movies.updateMany(
  { title: "Jurassic Park" },
  { $set: { title: "The Matrix" } }
);

// Vérifie les modifications
const replacedMovies = db.movies.find(
  { title: "The Matrix" },
  { title: 1 }
).toArray();

console.log(replacedMovies);




