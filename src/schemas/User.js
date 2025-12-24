/**!SECTION
 * @schema User
 * @description Represents a user in the database
 * @property {string} DiscordId - The Discord ID of the user
 * @property {string} Username - The username of the user
 * @property {string} Hash - The hashed password of the user
 * @property {string} Salt - The salt used to hash the password
 * @property {object} discordTokens - The Discord tokens for the user
 * @property {string} discordTokens.access_token - The access token for the user
 * @property {string} discordTokens.refresh_token - The refresh token for the user
 * @property {number} discordTokens.expires_in - The expiration time for the access token
 * @property {number} discordTokens.expires_at - The expiration time for the access token in milliseconds
 * @property {object} Units - the units the user in is
 * 
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    DiscordId: {type: String,default: null},
    Username: {type: String, required: true},
    IngameName: {type: String, default: ""},
    Email: {type: String, required: true},
    Hash: {type: String},
    Salt: {type: String},
    Units: {type: Object},// these are guilds 
    isDarkmode: {type: Boolean, default: false},
    SteamId: {type: String, default: ""},
    discordTokens: {
        access_token: {type: String},
        refresh_token: {type: String},
        expires_in: {type: Number},
        expires_at: {type: Number}
    }
}, {
    timestamps: true

});

module.exports = mongoose.model('User', User);
