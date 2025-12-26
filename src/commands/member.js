const {EmbedBuilder, SlashCommandBuilder} = require('discord.js');
const bkfd2Password = require("pbkdf2-password");
const hash = bkfd2Password();
const community = require("../schemas/community.js")
const User = require("../schemas/User.js")
module.exports = {
  data: new SlashCommandBuilder()
    .setName('member')
    .setDescription('Get information about a member')
    .addSubcommand(subcommand =>
      subcommand
        .setName('info')
        .setDescription('Get detailed information about a member')
        .addUserOption(option =>
          option.setName('target')
            .setDescription('The member to get information about')
            
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('register')
        .setDescription('Link a member to site account')
        .addStringOption(option =>
          option.setName('ingamename')
            .setDescription('The in-game name of the member')
            .setRequired(true)
        )
        .addStringOption(option =>
          option.setName('password')
            .setDescription('The password of the member')
            .setRequired(true)
        )
    ),
  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();
    if (subcommand === 'info') {
      let target = interaction.options.getUser('target');
      
      if (!target) { target = interaction.user; }
      

        User.findOne({ DiscordId: target.id }).then(user => {
          
          if (!user) {
            return interaction.reply({ content: 'Member not found.' });
          }
          const memberInfo = user.Units || [];
          const memberRank = user.Rank || 'N/A';
          const memberMOS = user.MOS || 'N/A';
          const memberCallsign = user.Callsign || 'N/A';
          const memberPoints = user.Points || 0;
          const memberStatus = user.Status || 'N/A';

          const embed = new EmbedBuilder()
            .setTitle(`${user.Username}'s Information`)
            .addFields(
              { name: 'In-Game Name', value: user.IngameName || 'N/A'},
              { name: 'Discord ID', value: user.DiscordId || 'N/A'},
              { name: 'Rank', value: memberRank},
              { name: 'MOS', value: memberMOS},

              { name: 'Callsign', value: memberCallsign},
              { name: 'Points', value: memberPoints.toString()},
              { name: 'Status', value: memberStatus}
              
            )
            .setColor('Blue');

          interaction.reply({ embeds: [embed] });
        });
      

    } else if (subcommand === 'register') {
      const ingamename = interaction.options.getString('ingamename');
      const password = interaction.options.getString('password');
      

      User.findOne({ IngameName: ingamename }).then(user => {
        if (!user) {
            return interaction.reply({ content: 'There is not a site account registered please register first online.' });
        }
        
        User.findOne({ DiscordId: interaction.user.id.toString() }).then(existingUser => {
          if (existingUser) {
            return interaction.reply({ content: 'This Discord account is already linked to a site account.' });
          }

         
        });
        community.findOne({ GuildId: interaction.guild.id.toString() }).then(Community => {
            if (!Community) {
                return interaction.reply({ content: 'This server is not registered in the community database.' });
            }

            const units = user.Units.filter(unit => unit.GuildId === interaction.guild.id.toString());
            if (units.length > 0) {
                return interaction.reply({ content: 'This member is already part of a unit in this server.' });
            }
            
            hash({ password: password,salt: user.Salt }, (err, pass, salt, hash) => {
                    if (err) {
                        console.error(err);
                        return interaction.reply({ content: 'An error occurred while hashing the password.' });
                    }
                    if (hash !== user.Hash) {
                        return interaction.reply({ content: 'Incorrect password.' });
                    }
                    else{
                user.Units.push(Community);
                user.DiscordId = interaction.user.id.toString();
                user.markModified('Units');

                user.save().then(() => {
                    return interaction.reply({ content: 'Member successfully added to the unit.' });
                }).catch(err => {
                    console.error(err);
                    return interaction.reply({ content: 'An error occurred while adding the member to the unit.' });
                });
            }
                });
        })
        .catch(err => {
            console.error(err);
            return interaction.reply({ content: 'An error occurred while checking the community.' });
        });


        
        });
      
    }
  }
}