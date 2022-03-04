/* eslint-disable require-atomic-updates */
module.exports = function (options = {}) {
    // eslint-disable-line no-unused-vars
    return async (context) => {
        // Get `app`, `method`, `params` and `result` from the hook context
        const { app, method, result, params } = context;
        // Function that adds the user to a single message object
        const addCommunityMember = async (comm) => {
            // Get the user based on their id, pass the `params` along so
            // that we get a safe version of the user data
            let u;
            if (comm.members) {
                const userMembers = await Promise.all(
                    comm.members.map(async (member) => {
                        const user = await app.service("users").get(member._id);
                        const {
                            _id,
                            firstname,
                            lastname,
                            email,
                            username,
                        } = user;
                        return {
                            _id,
                            firstname,
                            lastname,
                            email,
                            username,
                            ...member,
                        };
                    })
                );

                return {
                    ...comm,
                    userMembers,
                };
            }
            return comm;
            // Merge the message content to include the `user` object
        };

        // console.log(context);
        // // In a find method we need to process the entire page
        if (method === "find") {
            // Map all data to include the `user` information
            context.result.data = await Promise.all(
                result.data.map(addCommunityMember)
            );
        } else {
            // Otherwise just update the single result
            context.result = await addCommunityMember(result);
        }
        // console.log(context);
        return context;
    };
};
