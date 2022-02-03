const Season = require('../../models/season.model');
const Episode = require('../../models/episode.model');

module.exports = {
    Query: {
        getSeasons: () => {
            return Season.find();
        },
        getSeason: (parent, args) => {
            return Season.findById(args.id);
        }
    },

    Mutation: {
        createSeason: (parent, args) => {
            const season = new Season({
                id: args.id,
                name: args.name,
                description: args.description,
                year: args.year,
                serie: args.serie,
                episode: args.episode
            });
            season.save()
            return season
        },
        updateSeason: (parent, args) => {
            const season = Season.findByIdAndUpdate(
                args.id,
                {
                    name: args.name,
                    description: args.description,
                    year: args.year,
                    serie: args.serie,
                    episode: args.episode
                }
            )
            return season
        },
        deleteSeason: async (parent, args) => {
            const season = await Season.exists({ _id: args.id })
            if (season) {
                await Season.findByIdAndDelete(args.id)
                Episode.deleteMany({season: args.id})
                return {
                    message: "Deleted",
                    code: 204
                }
            }
            else {
                return {
                    message: "Season inexistant",
                    code: 404
                }
            }
        }
    }
}
