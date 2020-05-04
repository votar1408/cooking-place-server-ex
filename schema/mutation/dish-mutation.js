const graphql = require('graphql');

const { GraphQLNonNull, GraphQLID, GraphQLString } = graphql;

const Dishes = require('../../models/dish');
const {DishType} = require('../all-types');

exports.addDish = {
    type: DishType,
    args: {
        name: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(parent, args) {
        const { name } = args;
        const dish = new Dishes({ name });

        return dish.save();
    }
};

exports.removeDish = {
    type: DishType,
    args: {
        id: { type: GraphQLID }
    },
    resolve(parent, args) {
        return Dishes.findByIdAndRemove(args.id, {useFindAndModify: false });
    }
};

exports.updateDish = {
    type: DishType,
    args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(parent, args) {
        const { id, name } = args;
        return Dishes.findByIdAndUpdate(
            id,
            { $set: { name } },
            { new: true, useFindAndModify: false }
        );
    }
}