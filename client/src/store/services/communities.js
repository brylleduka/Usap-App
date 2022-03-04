import feathersClient, {
  makeServicePlugin,
  BaseModel
} from "../../feathers-client";

class Community extends BaseModel {
  constructor(data, options) {
    super(data, options);
  }
  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = "Community";
  // Define default properties here
  static instanceDefaults() {
    return {
      name: "",
      icon: ""
    };
  }
}
const servicePath = "communities";
const servicePlugin = makeServicePlugin({
  Model: Community,
  service: feathersClient.service(servicePath),
  servicePath
});

// Setup the client-side Feathers hooks.
feathersClient.service(servicePath).hooks({
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
});

export default servicePlugin;
