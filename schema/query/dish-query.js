const graphql = require('graphql');

const { GraphQLList, GraphQLID } = graphql;

const Dishes = require('../../models/dish');
const { DishType } = require('../all-types');

exports.dish = {
    type: DishType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
        return Dishes.findById(args.id);
    }
};

exports.dishes = {
    type: new GraphQLList(DishType),
    resolve(parent, args) {
        return Dishes.find({});
    }
};