const Category = require('../../models/category.model');

module.exports = {
    Query: {
        getCategories: () => {
            return Category.find();
        },
        getCategory: (parent, args) => {
            return Category.findById(args.id);
        }
    },

    Mutation: {
        createCategory: (parent, args) => {
            const category = new Category({
                name: args.name,
            });
            newCategory.save()
            return category
        },
        updateCategory: (parent, args) => {
            const category = Category.findByIdAndUpdate(
                args.id,
                {
                    name: args.name,
                }
            )
            return category
        },
        deleteCategory: async  (parent, args) => {
            const category = await Category.exists({ _id: args.id })
            if (category) {
                await Category.findByIdAndDelete(args.id)
                return {
                    message: "Deleted",
                    code: 204
                }
            }
            else {
                return {
                    message: "Category inexistant",
                    code: 404
                }
            }
        }
    }
}
