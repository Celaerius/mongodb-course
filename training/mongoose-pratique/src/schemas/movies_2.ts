import { model, Schema } from "mongoose";

const movie = new Schema({
  plot: {
    type: String,
  },
  genres: {
    type: [String],
  },
  runtime: {
    type: Number,
  },
  cast: {
    type: [String],
  },
  num_mflix_comments: {
    type: Number,
  },
  title: {
    type: String,
  },
  fullplot: {
    type: String,
  },
  counries: {
    type: [String],
  },
  released: {
    type: Number,
  },
  directors: {
    type: [String],
  },
  rated: {
    type: String,
    required: true,
    validate: {
      validator: function (v : string) {
        return /^(G|PG|PG-\d+|R|NC-\d+|NOT RATED|UNRATED)$/i.test(v);
      },
      message: (props : any) => `${props.value} n'est pas une classification valide!`,
    },
  },
  awards: {
    type: new Schema({
      wins: {
        type: Number,
      },
      nominations: {
        type: Number,
      },
      text: {
        type: String,
      },
    }),
  },
  lastupdated: {
    type: Date,
  },
  year: {
    type: Number,
  },
  imdb: {
    rating: {
      type: Number,
    },
    votes: {
      type: Number,
    },
    id: {
      type: Number,
    },
  },
  tomatoes: {
    type: new Schema({
      viewer: {
        type: new Schema({
          rating: Number,
          numReviews: Number,
          meter: Number,
        }),
      },
      lastupdated: Date,
    }),
  },
});

export const MovieModel = model("movies", movie);
