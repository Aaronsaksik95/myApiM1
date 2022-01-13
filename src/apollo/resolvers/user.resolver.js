const User = require('../../models/user.model');

module.exports = {
    Query: {
        getUsers: () => {
            return User.find();
        },
        getUser: (parent, args) => {
            return User.findById(args.id);
        }
    },

    Mutation: {
        createUser: (parent, args) => {
            const user = new User({
                id: args.id,
                name: args.name,
                price: args.price,
                description: args.description
            });
            user.save()
            return user
        },
        updateUser: (parent, args) => {
            const user = User.findByIdAndUpdate(
                args.id,
                {
                    name: args.name,
                    price: args.price,
                    description: args.description
                }
            )
            return user
        },
        deleteUser: async (parent, args) => {
            const user = await User.exists({_id: args.id})
            if (user){
                await User.findByIdAndDelete(args.id)
                return{
                    message: "Deleted",
                    code: 204
                }
            }
            else{
                return{
                    message: "User inexistant",
                    code: 404
                }
            }
        }
    }
}
