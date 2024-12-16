const Users = require('./schemas/User.js');
async function storeDiscordTokens(userId, tokens) {
    Users.findOneAndUpdate({ DiscordId: userId }, { discordTokens: tokens }, { upsert: true }).then((user) => {
        if (user) {
            console.log('Discord tokens stored');
            return;
        } else {
            console.log('Error storing discord tokens');
            return;
        }
    })
    }
    async function getDiscordTokens(userId) {
        const user = await Users.findOne({ DiscordId: userId });
        if (user) {
            return user.discordTokens;
        } else {
            return;
        }
        
      }

    module.exports = {
        storeDiscordTokens: storeDiscordTokens,
        getDiscordTokens: getDiscordTokens,
    }