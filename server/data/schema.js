/* eslint-disable no-unused-vars, no-use-before-define */
import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
  cursorForObjectInConnection
} from 'graphql-relay';

import {
  User,
  Feature,
  Car,
  getUser,
  getCar,
  getCars,
  getFeature,
  getFeatures,
  addFeature,
  updateCar
} from './database';


/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */
const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    if (type === 'User') {
      return getUser(id);
    } else if (type === 'Feature') {
      return getFeature(id);
    } else if (type === 'Car') {
      return getCar(id);
    }
    return null;
  },
  (obj) => {
    if (obj instanceof User) {
      return userType;
    } else if (obj instanceof Feature) {
      return featureType;
    } else if (obj instanceof Car) {
      return carType;
    }
    return null;
  }
);

/**
 * Define your own types here
 */

const userType = new GraphQLObjectType({
  name: 'User',
  description: 'A person who uses our app',
  fields: () => ({
    id: globalIdField('User'),
    features: {
      type: featureConnection,
      description: 'Features that I have',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(getFeatures(), args)
    },
    username: {
      type: GraphQLString,
      description: 'Users\'s username'
    },
    website: {
      type: GraphQLString,
      description: 'User\'s website'
    }
  }),
  interfaces: [nodeInterface]
});

const carType = new GraphQLObjectType({
  name: 'Car',
  description: 'A car',
  fields: () => ({
    id: globalIdField('Car'),
    year: {
      type: GraphQLInt,
      description: "Car's year"
    },
    color: {
      type: GraphQLString,
      description: "Car's color"
    },
    model: {
      type: GraphQLString,
      description: "Car's model"
    },
    make: {
      type: GraphQLString,
      description: "Car's make"
    },
  }),
  interfaces: [nodeInterface]
});

const featureType = new GraphQLObjectType({
  name: 'Feature',
  description: 'Feature integrated in our starter kit',
  fields: () => ({
    id: globalIdField('Feature'),
    name: {
      type: GraphQLString,
      description: 'Name of the feature'
    },
    description: {
      type: GraphQLString,
      description: 'Description of the feature'
    },
    url: {
      type: GraphQLString,
      description: 'Url of the feature'
    }
  }),
  interfaces: [nodeInterface]
});

/**
 * Define your own connection types here
 */
const { connectionType: featureConnection, edgeType: featureEdge } = connectionDefinitions({ name: 'Feature', nodeType: featureType });

/**
 * Create feature example
 */

const addFeatureMutation = mutationWithClientMutationId({
  name: 'AddFeature',
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLString) },
  },

  outputFields: {
    featureEdge: {
      type: featureEdge,
      resolve: (obj) => {
        const cursorId = cursorForObjectInConnection(getFeatures(), obj);
        return { node: obj, cursor: cursorId };
      }
    },
    viewer: {
      type: userType,
      resolve: () => getUser('1')
    }
  },

  mutateAndGetPayload: ({ name, description, url }) => addFeature(name, description, url)
});

const updateCarMutation = mutationWithClientMutationId({
  name: 'UpdateCar',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    make: { type: new GraphQLNonNull(GraphQLString) },
    model: { type: new GraphQLNonNull(GraphQLString) },
    year: { type: GraphQLInt },
    color: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    car: {
      type: carType,
      resolve: (src, args, ctx) => src
    }
  },

  mutateAndGetPayload: (args) => {
    const { _, id } = fromGlobalId(args.id);
    return updateCar(id, {
      make: args.make,
      model: args.model,
      year: args.year,
      color: args.color
    });
  }
});


const rootType = new GraphQLObjectType({
  name: 'Root',
  fields: () => ({
    cars: {
      type: new GraphQLList(carType),
      args: {
        limit: {
          name: 'limit',
          type: new GraphQLNonNull(GraphQLInt)
        },
        offset: {
          name: 'offset',
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve: (src, args, ctx) => {
        const cars = getCars().slice(args.offset);
        return Array.from({ length: args.limit }, (v, k) => cars[k]);
      }
    }
  })
});

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
const rootObject = { id: 'root' };

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    // Add your own root fields here
    root: {
      type: rootType,
      resolve: () => rootObject
    },
    viewer: {
      type: userType,
      resolve: () => getUser('1')
    },
    car: {
      type: carType,
      args: {
        id: {
          name: 'id',
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (src, args, ctx) => getCar(args.id)
    },
  })
});

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */
const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addFeature: addFeatureMutation,
    updateCar: updateCarMutation
    // Add your own mutations here
  })
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export default new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});
