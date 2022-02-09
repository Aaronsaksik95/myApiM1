const Movie = require('../../models/movie.model');
const jwt = require('jsonwebtoken');

const applyResolverMid = require('apollo-resolver-middleware');

const resolvers = {
    Query: {
        getMovies: (parent, args, context) => {
            if ("category" in args) {
                const movies = Movie.find({ category: args.category }).populate('category')
                return movies
            }
            else {
                const movies = Movie.find().populate('category');
                return movies
            }
        },
        getMovie: (parent, args) => {
            return Movie.findById(args.id).populate('category');
        },
        getSearchMovie: async (parent, args) => {
            const resultMovie = [];
            const movies = await Movie.find().populate('category')
            movies.forEach(element => {
                const categories = [];
                element.category.forEach(categ => {
                    categories.push(categ.name)
                });
                element.actor.forEach(actor => {
                    if (actor.includes(args.name) && !resultMovie.includes(element)) {
                        resultMovie.push(element)
                    }
                });
                categories.forEach(categ => {
                    if (categ.includes(args.name) && !resultMovie.includes(element)) {
                        resultMovie.push(element)
                    }
                })
                if (element.name.includes(args.name) && !resultMovie.includes(element)) {
                    resultMovie.push(element)
                }
            })
            return resultMovie;
        }
    },

    Mutation: {
        createMovie: (parent, args) => {
            const movie = new Movie({
                id: args.id,
                name: args.name,
                time: args.time,
                image: args.image,
                video: args.video,
                description: args.description,
                year: args.year,
                like: args.like,
                category: args.category,
                actor: args.actor
            });
            movie.save()
            return movie;
        },
        updateMovie: (parent, args) => {
            return Movie.findByIdAndUpdate(
                args.id,
                {
                    name: args.name,
                    time: args.time,
                    image: args.image,
                    video: args.video,
                    description: args.description,
                    year: args.year,
                    like: args.like,
                    category: args.category,
                    actor: args.actor,
                }
            )
        },
        deleteMovie: async (parent, args) => {
            const movie = await Movie.exists({ _id: args.id })
            if (movie) {
                await Movie.findByIdAndDelete(args.id)
                return {
                    message: "Deleted",
                    code: 204
                }
            }
            else {
                return {
                    message: "Movie inexistant",
                    code: 404
                }
            }
        }
    }
}

applyResolverMid(resolvers, 'Query.getMovies', (args, context, next) => {
    if (!context.token) {
        console.log("missing token")
    }
    try {
        var decoded = jwt.verify(context.token, process.env.SECRET_JWT);
    } catch (err) {
        console.log(err)
    }
    if (decoded.isSub == false) {
        console.log("not Sub")
    }
    else {
        return next()
    }
})

applyResolverMid(resolvers, 'Query.getMovie', (args, context, next) => {
    if (!context.token) {
        console.log("missing token")
    }
    try {
        var decoded = jwt.verify(context.token, process.env.SECRET_JWT);
    } catch (err) {
        console.log(err)
    }
    console.log(decoded);
    if (decoded.isSub == false) {
        console.log("not Sub")
    }
    else {
        return next()
    }
})

applyResolverMid(resolvers, 'Query.getSearchMovie', (args, context, next) => {
    if (!context.token) {
        console.log("missing token")
    }
    try {
        var decoded = jwt.verify(context.token, process.env.SECRET_JWT);
    } catch (err) {
        console.log(err)
    }
    if (decoded.isSub == false) {
        console.log("not Sub")
    }
    else {
        return next()
    }
})

module.exports = resolvers
