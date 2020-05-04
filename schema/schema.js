const { GraphQLObjectType, GraphQLSchema } = require('graphql');

const dishQuery = require('./query/dish-query');
const dishMutation = require('./mutation/dish-mutation');

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        ...dishMutation
    }
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        ...dishQuery
    }
});

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});