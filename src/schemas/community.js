

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

// handles point allocation for ranks
const RankInfo = new mongoose.Schema({
    RoleName: {type: String, default: ""},
    RoleId: {type: String, default: ""},
    Points: {type: Number, default: 0}
});


// main community schema added to player on guild join 
const Community = new mongoose.Schema({
    Name: {type: String, required: true},
    Description: {type: String, required: true},
    DiscordInvite: {type: String, default: null},
    GuildId: {type: Object, required: true},
    Owner: {type: String, required: true},
    RankInfo: {type: [RankInfo], default: []},
    Rank: {type: String, default: ""},
    Status: {type: String, default: "Active"},
   
    Events: {type: Array, default: []},
    Trainings: {type: Array, default: []},
    UsePoints:{type: Boolean, default: false},
    Points: {type: Number, default: 0},
    Callsign: {type: String, default: ""},
    IsRP: {type: Boolean, default: false},
    RpInfo: {type: RpInfo, default: {} },
    MOS: {type: String, default: ""},
    EventChannel: {type: String, default: null},
    PromoChannel: {type: String, default: null},
    


});






module.exports = mongoose.model('Community', Community);