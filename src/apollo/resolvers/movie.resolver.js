const Movie = require('../../models/movie.model');
const jwt = require('jsonwebtoken');

const resolvers = {
    Query: {
        getMovies: (parent, args, context) => {
            const decoded = jwt.verify(context.token, process.env.SECRET_JWT);
            if (decoded.isSub == true) {
                if ("category" in args) {
                    if ("superSub" in args) {
                        const movies = Movie.find({ category: args.category, superSub: args.superSub }).populate('category')
                        return movies
                    }
                    else {
                        const movies = Movie.find({ category: args.category }).populate('category')
                        return movies
                    }
                }
                else {
                    if ("superSub" in args) {
                        const movies = Movie.find({ superSub: args.superSub }).populate('category');
                        return movies
                    }
                    else {
                        const movies = Movie.find().populate('category');
                        return movies
                    }

                }
            }
        },
        getMovie: (parent, args, context) => {
            const decoded = jwt.verify(context.token, process.env.SECRET_JWT);

            if (decoded.isSub == true) {
                return Movie.findById(args.id).populate('category');
            }
        },
        getSearchMovie: async (parent, args, context) => {
            const decoded = jwt.verify(context.token, process.env.SECRET_JWT);

            const resultMovie = [];
            if (decoded.isSub == true) {
                const movies = await Movie.find().populate('category')
                movies.forEach(element => {
                    const categories = [];
                    element.category.forEach(categ => {
                        categories.push(categ.name)
                    });
                    element.actor.forEach(actor => {
                        if (actor.includes(args.name) && !resultMovie.includes(element)) {
                            if (decoded.superSub) {
                                resultMovie.push(element)
                            }
                            else {
                                if (!element.superSub) {
                                    resultMovie.push(element)
                                }
                            }
                        }
                    });
                    categories.forEach(categ => {
                        if (categ.includes(args.name) && !resultMovie.includes(element)) {
                            if (decoded.superSub) {
                                resultMovie.push(element)
                            }
                            else {
                                if (!element.superSub) {
                                    resultMovie.push(element)
                                }
                            }
                        }
                    })
                    if (element.name.includes(args.name) && !resultMovie.includes(element)) {
                        if (decoded.superSub) {
                            resultMovie.push(element)
                        }
                        else {
                            if (!element.superSub) {
                                resultMovie.push(element)
                            }
                        }
                    }
                })
                return resultMovie;
            }
        }
    },

    Mutation: {
        createMovie: (parent, args, context) => {
            const decoded = jwt.verify(context.token, process.env.SECRET_JWT);

            if (decoded.isAdmin == true) {
                const movie = new Movie({
                    id: args.id,
                    name: args.name,
                    time: args.time,
                    image: args.image,
                    video: args.video,
                    description: args.description,
                    year: args.year,
                    superSub: args.superSub,
                    category: args.category,
                    actor: args.actor
                });
                movie.save()
                return movie;
            }
        },
        updateMovie: (parent, args, context) => {
            const decoded = jwt.verify(context.token, process.env.SECRET_JWT);

            if (decoded.isAdmin == true) {
                return Movie.findByIdAndUpdate(
                    args.id,
                    {
                        name: args.name,
                        time: args.time,
                        image: args.image,
                        video: args.video,
                        description: args.description,
                        year: args.year,
                        superSub: args.superSub,
                        category: args.category,
                        actor: args.actor,
                    }
                )
            }
        },
        deleteMovie: async (parent, args, context) => {
            const decoded = jwt.verify(context.token, process.env.SECRET_JWT);

            if (decoded.isAdmin == true) {
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
}

module.exports = resolvers
