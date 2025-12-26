const mongoose = require('mongoose');


// divisons template
const DivisionInfo = new mongoose.Schema({
    Name: {type: String},
    Description: {type: String},
    DivisionId: {type: Object},
    Owner: {type: String},
    
    Squads: {type: [SquadInfo], default: []}
});

//squad template
const SquadInfo = new mongoose.Schema({
    Name: {type: String},
    Description: {type: String},
    SquadId: {type: Object},
    Owner: {type: String},
    Members: {type: Array, default: []}
});




const schema = new mongoose.Schema({
  Name: {type: String, required: true},
  Description: {type: String, required: true},
  guildId: {type: Object, required: true},
  Divisions: {type: [DivisionInfo], default: []}
});
module.exports = mongoose.model('Division', schema);