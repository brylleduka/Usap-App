const users = require("./users/users.service.js");
const communities = require("./communities/communities.service.js");
const channels = require("./channels/channels.service.js");
const messages = require("./messages/messages.service.js");
const members = require('./members/members.service.js');
const admins = require('./admins/admins.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
    app.configure(users);
    app.configure(communities);
    app.configure(channels);
    app.configure(messages);
    app.configure(members);
    app.configure(admins);
};
