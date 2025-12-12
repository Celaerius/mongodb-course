let db = connect("mongodb://root:test123@localhost:27017?authSource=admin");
db = db.getSiblingDB("sample_mflix");

const result = db.movies.aggregate([
    {
        $lookup: {
            from: "comments",
            localField: "_id",
            foreignField: "movie_id",
            as: "movie_comments"
        }
    },
    {
        $match: {
            "movie_comments.0": {
                $exists: true
            }
        }
    },
    {
        $project: {
            title: true,
            movie_comments: true
        }
    },
    {
        $limit: 5
    }
]);

console.log(result);
