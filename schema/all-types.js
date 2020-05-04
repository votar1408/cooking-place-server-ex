const graphql = require('graphql');
const { GraphQLNonNull, GraphQLList, GraphQLID, GraphQLObjectType, GraphQLString } = graphql;

const Recipes = require('../models/recipe');

const RecipeType = new GraphQLObjectType({
    name: 'RecipeType',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        dishType: {
            type: DishType,
            resolve(parent, args) {
                return Dishes.findById(parent.dishType);
            }
        }
    })
});

const DishType = new GraphQLObjectType({
    name: 'DishType',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        recipes: {
            type: new GraphQLList(RecipeType),
            resolve({ id }, args) {
                return Recipes.find({ dishType: id });
            }
        }
    })
});

module.exports = { RecipeType, DishType };