const { Service } = require("feathers-mongoose");
const mongoose = require("mongoose");

exports.Members = class Members extends Service {
    setup(app) {
        this.app = app;
    }
    async patch(id, data, params) {
        let result;
        const members = await this.app
            .service("members")
            .find({ query: { communityId: params.query.communityId } });

        members.data.forEach(async (member) => {
            await member.users.push(mongoose.Types.ObjectId(data.users));
            result = await super.patch(null, member, params);
        });
        return members;
        // await members.data.push(mongoose.Types.ObjectId(data.users));
        // const result = members;
    }
};
