const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
        if(context.user) {
            const userData = await User.findOne({ _id: context.user._id })
              .select('-__v -password')
              .populate('books');

              return userData;
        }
        throw new AuthenticationError('Not logged in.');
    }
  },
};

// export resolvers
module.exports = resolvers;