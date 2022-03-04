const { Service } = require("feathers-mongoose");
const mongoose = require("mongoose");
exports.Communities = class Communities extends Service {
    setup(app) {
        this.app = app;
    }
    async patch(id, data, params) {
        console.log(params.query);
        const { deny, add, approve } = params.query;
        const community = await this.app.service("communities").get(id);
        let result = {};

        if (add) {
            const existingMember = await community.members.find((member) =>
                member._id.equals(data.members._id)
            );
            if (existingMember) throw new Error("Exist");
            await community.members.push({
                _id: mongoose.Types.ObjectId(data.members._id),
            });

            result = community;
        } else if (approve) {
            const member = await community.members.find((member) =>
                member._id.equals(data.members._id)
            );

            result = {
                ...community,
                members: {
                    ...member,
                    membership: params.query.approve,
                },
            };
        } else if (deny) {
            const comm = await community.members.filter(
                (member) => member._id.toString() !== data.members._id
            );

            result = { ...community, members: comm };
        } else {
            result = { ...data };
        }

        return await super.patch(id, result);
    }
};
