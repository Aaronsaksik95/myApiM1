const Movie = require('../../models/movie.model');

module.exports = {
    Query: {
        getMovies: () => {
            return Movie.find();
        },
        getMovie: (parent, args) => {
            return Movie.findById(args.id);
        }
    },

    Mutation: {
        createMovie: (parent, args) => {
            const movie = new Movie({
                id: args.id,
                name: args.name,
                price: args.price,
                description: args.description
            });
            movie.save()
            return movie
        },
        updateMovie: (parent, args) => {
            const movie = Movie.findByIdAndUpdate(
                args.id,
                {
                    name: args.name,
                    price: args.price,
                    description: args.description
                }
            )
            return movie
        },
        deleteMovie: async (parent, args) => {
            const movie = await Movie.exists({_id: args.id})
            if (movie){
                await Movie.findByIdAndDelete(args.id)
                return{
                    message: "Deleted",
                    code: 204
                }
            }
            else{
                return{
                    message: "Movie inexistant",
                    code: 404
                }
            }
        }
    }
}
