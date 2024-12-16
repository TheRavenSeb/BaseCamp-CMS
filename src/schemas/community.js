const mongoose = require('mongoose');



const Community = new mongoose.Schema({
    Name: {type: String, required: true},
    Description: {type: String, required: true},
    Owner: {type: String, required: true},
    MemberCount: {type: Number, default: 0},
    Tags: {type: Array, default: []},
    Isverified: {type: Boolean, default: false},
    IsOffical: {type: Boolean, default: false},
    DiscordInvite: {type: String, required: true},

});
