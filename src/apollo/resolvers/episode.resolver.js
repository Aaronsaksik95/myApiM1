const Episode = require('../../models/episode.model');

module.exports = {
    Query: {
        getEpisodes: () => {
            return Episode.find();
        },
        getEpisode: (parent, args) => {
            return Episode.findById(args.id);
        }
    },

    Mutation: {
        createEpisode: (parent, args) => {
            const episode = new Episode({
                id: args.id,
                name: args.name,
                time: args.time,
                image: args.image,
                video: args.video,
                description: args.description,
                season: args.season,
                serie: args.serie,
            });
            episode.save()
            return episode
        },
        updateEpisode: (parent, args) => {
            const episode = Episode.findByIdAndUpdate(
                args.id,
                {
                    name: args.name,
                    time: args.time,
                    image: args.image,
                    video: args.video,
                    description: args.description,
                    season: args.season,
                    serie: args.serie,
                }
            )
            return episode
        },
        deleteEpisode: async (parent, args) => {
            const episode = await Episode.exists({ _id: args.id })
            if (episode) {
                await Episode.findByIdAndDelete(args.id)
                return {
                    message: "Deleted",
                    code: 204
                }
            }
            else {
                return {
                    message: "Episode inexistant",
                    code: 404
                }
            }
        }
    }
}
