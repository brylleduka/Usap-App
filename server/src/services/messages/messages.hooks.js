const { authenticate } = require("@feathersjs/authentication").hooks;
const { setField } = require("feathers-authentication-hooks");
// const processMessage = require('../../hooks/process-message');

const setSenderId = setField({
  from: "params.user._id",
  as: "data.userId",
});

const limitToSender = setField({
  from: "params.user._id",
  as: "params.query.userId",
});

const populateUser = require('../../hooks/populate-user');

module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [],
    get: [],
    create: [setSenderId],
    update: [limitToSender],
    patch: [limitToSender],
    remove: [limitToSender],
  },

  after: {
    all: [populateUser()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
