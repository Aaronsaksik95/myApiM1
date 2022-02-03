const Serie = require('../../models/serie.model');
const Season = require('../../models/season.model');
const Episode = require('../../models/episode.model');
const M = require('../resolvers/movie.resolver')

module.exports = {
    Query: {
        getSeries: () => {
            if ("category" in args) {
                return Serie.find({ category: args.category })
            }
            else {
                return Serie.find()
            }
        },
        getSerie: (parent, args) => {
            return Serie.findById(args.id);
        }
    },

    Mutation: {
        createSerie: (parent, args) => {
            const serie = new Serie({
                id: args.id,
                name: args.name,
                image: args.image,
                description: args.description,
                like: args.like,
                category: args.CategoryId,
                actor: args.actor,
                season: args.saison
            });
            serie.save()
            return serie
        },
        updateSerie: (parent, args) => {
            const serie = Serie.findByIdAndUpdate(
                args.id,
                {
                    name: args.name,
                    image: args.image,
                    description: args.description,
                    like: args.like,
                    category: args.CategoryId,
                    actor: args.actor,
                    season: args.saison
                }
            )
            return serie
        },
        deleteSerie: async (parent, args) => {
            const serie = await Serie.exists({ _id: args.id })
            if (serie) {
                await Serie.findByIdAndDelete(args.id)
                Season.deleteMany({serie: args.id})
                Episode.deleteMany({serie: args.id})
                return {
                    message: "Deleted",
                    code: 204
                }
            }
            else {
                return {
                    message: "Serie inexistant",
                    code: 404
                }
            }
        }
    }
}
