const { Service } = require("feathers-mongoose");
const { NotFound } = require("@feathersjs/errors")

exports.Messages = class Messages extends Service {
    async find({ query }) {
        const { communityId, channelId } = query;
        try {
            return await super.find({
                query: {
                    communityId,
                    channelId,
                    ...query,

                }
            })
        } catch (error) {
            throw new NotFound(error);
        }
    }
};
