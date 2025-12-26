const {EmbedBuilder, SlashCommandBuilder} = require('discord.js');
const community = require("../schemas/community.js")
module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup')
    .setDescription('Setup the server for the community')
    .addSubcommand(subcommand =>
      subcommand
        .setName('auto')
        .setDescription('Automatically creates a basic community setup')
        .addBooleanOption(option =>
          option.setName('is-rp')
            .setDescription('Is this a roleplay community?')
            .setRequired(false)
        )
        .addBooleanOption(option =>
          option.setName('use-points')
            .setDescription('Use points system for promotions?')
            .setRequired(false)
        )
        .addStringOption(option =>
          option.setName('description')
            .setDescription('Add a community description')
            .setRequired(false)
        )
        .addChannelOption(option =>
          option.setName('event-channel')
            .setDescription('Select channel for event announcements (leave blank for create new channel)')
            .setRequired(false)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('edit')
        .setDescription('Edit the community settings')
        .addBooleanOption(option =>
          option.setName('is-rp')
            .setDescription('Is this a roleplay community?')
            .setRequired(false)
        )
        .addBooleanOption(option =>
          option.setName('use-points')
            .setDescription('Use points system for promotions?')
            .setRequired(false)
        )
        .addStringOption(option =>
          option.setName('description')
            .setDescription('Edit the community description')
            .setRequired(false)
        )
        .addChannelOption(option =>
          option.setName('promo-channel')
            .setDescription('Change channel for rank up alerts (only works with use-points enabled)')
            .setRequired(false)
        )
        .addChannelOption(option =>
          option.setName('event-channel')
            .setDescription('Change channel for event announcements')
            .setRequired(false)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('role')
        .setDescription('Create a role for the community members')
        .addRoleOption(option =>
          option.setName('rank')
            .setDescription('Assign a rank to this role')
            .setRequired(true)
        )
        .addStringOption(option =>
          option.setName('point-value')
            .setDescription('Assign a point value to this role')
            .setRequired(false)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('delete')
        .setDescription('Delete the community setup')
    ),
  async execute(interaction) {
    const isRp = interaction.options.getBoolean('is-rp');
    const usePoints = interaction.options.getBoolean('use-points');
    const description = interaction.options.getString('description');
    const eventChannel = interaction.options.getChannel('event-channel');
    const promoChannel = interaction.options.getChannel('promo-channel');
    const role = interaction.options.getRole('rank');
    const pointValue = interaction.options.getString('point-value');
    const deleteSetup = interaction.options.getBoolean('delete');
    const subcommand = interaction.options.getSubcommand();

    if (subcommand === 'auto') {
        
        community.findOne({ guildId: interaction.guild.id.toString() }).then(Community => {

            if (Community) {
                //check is channel creation is needed 
                if (!Community.EventChannel) {
                    interaction.guild.channels.create('event-announcements', { type: 'GUILD_TEXT' }).then(channel => {
                        Community.EventChannel = channel.id;  
                    });
                }
                if (!Community.PromoChannel) {
                    interaction.guild.channels.create('promo-announcements', { type: 'GUILD_TEXT' }).then(channel => {
                        Community.PromoChannel = channel.id;
                    });
                }

                if (isRp) {
                    Community.IsRP = true;
                }
                if (usePoints) {
                    Community.UsePoints = true;
                }
                if (description) {
                    Community.Description = description;
                }
                if (eventChannel) {
                    Community.EventChannel = eventChannel.id;
                }
                if (promoChannel) {
                    Community.PromoChannel = promoChannel.id;
                }
                const embed = new EmbedBuilder()
                    .setTitle('Community Setup Updated')
                    .setDescription('The community setup has been updated successfully.')
                    .addFields(
                        { name: 'Is RP', value: Community.IsRP ? 'Yes' : 'No', inline: true },
                        { name: 'Use Points', value: Community.UsePoints ? 'Yes' : 'No', inline: true },
                        { name: 'Description', value: Community.Description || 'No description set', inline: true },
                        { name: 'Event Channel', value: Community.EventChannel ? `<#${Community.EventChannel}>` : 'No channel set', inline: true },
                        { name: 'Promo Channel', value: Community.PromoChannel ? `<#${Community.PromoChannel}>` : 'No channel set', inline: true }
                    )
                    .setColor('GREEN');
                interaction.reply({ embeds: [embed] });
            }
        });
    } else if (subcommand === 'edit') {
      
        community.findOne({ guildId: interaction.guild.id }).then(Community => {
            
          if (Community) {
           Community.UsePoints;
           Community.UsePoints = usePoints;
           Community.Description = description;
           Community.EventChannel = eventChannel ? eventChannel.id : null;
           Community.PromoChannel = promoChannel ? promoChannel.id : null;
           Community.save();
           
           interaction.reply({ content: 'Community settings have been updated successfully.' });
          } else {
            interaction.reply({ content: 'This server is not registered in the community database.' });
          }
        });      
    } else if (subcommand === 'role') {
      // Role creation logic here
    } else if (subcommand === 'delete') {
      // Delete setup logic here
      
      // confirm deletion
      // Deletion logic here
    }
  }
}

