// community-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
    const modelName = "communities";
    const mongooseClient = app.get("mongooseClient");
    const { Schema } = mongooseClient;
    const schema = new Schema(
        {
            name: { type: String, required: true },
            icon: { type: String },
            public: { type: Boolean, default: false },
            ownerId: {
                type: Schema.Types.ObjectId,
                ref: "users",
            },
            members: [
                {
                    _id: { type: Schema.Types.ObjectId, ref: "users" },
                    membership: { type: Boolean, default: false },
                    admin: { type: Boolean, default: false },
                },
            ],
        },
        {
            timestamps: true,
        }
    );

    // This is necessary to avoid model compilation errors in watch mode
    // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
    if (mongooseClient.modelNames().includes(modelName)) {
        mongooseClient.deleteModel(modelName);
    }
    return mongooseClient.model(modelName, schema);
};
