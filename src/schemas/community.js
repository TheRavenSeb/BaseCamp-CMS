
const mongoose = require('mongoose');

const RpInfo = new mongoose.Schema({
    CharacterName: {type: String, default: ""},
    Age: {type: Number, default: 0},
    Gender: {type: String, default: ""},
    Background: {type: String, default: ""},
    Department: {type: String, default: ""},
    Rank: {type: String, default: ""},
    Faction: {type: String, default: ""}
});

const Community = new mongoose.Schema({
    Name: {type: String, required: true},
    Description: {type: String, required: true},
    DiscordInvite: {type: String, default: null},
    GuildId: {type: Object, required: true},
    Owner: {type: String, required: true},
    Trainings: {type: Array, default: []},
    UsePoints:{type: Boolean, default: false},
    Rank2Points: {type: Array, default: []}, // server will assign roles and point value [{roleId: String, points: Number}]
    Callsign: {type: String, default: ""},
    IsRP: {type: Boolean, default: false},
    RpInfo: {type: RpInfo, default: {} },
    MOS: {type: String, default: ""}
});






module.exports = mongoose.model('Community', Community);