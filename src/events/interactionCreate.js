const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const User = require("../schemas/User");

const Devs =["582279365912559631"];

module.exports = {
	name: "interactionCreate",
	async execute(interaction, client) {
const command = client.commands.get(interaction.commandName);

if (interaction.isModalSubmit()){
if (interaction.customId === 'after-action-report') {
	// Retrieve values from the modal's input fields
	const missionName = interaction.fields.getTextInputValue('mission_name');
	const missionType = interaction.fields.getTextInputValue('mission_type');
	const missionDate = interaction.fields.getTextInputValue('mission_date');
	const missionParticipants = interaction.fields.getTextInputValue('mission_participants');
	const missionNotes = interaction.fields.getTextInputValue('mission_notes');

	// Create an embed to display the information
	const embed = new EmbedBuilder()
		.setTitle('After Action Report')
		.setDescription('Here is the After Action Report:')
		.setColor('#0099ff')
		.setTimestamp()
		.addFields(
			{ name: 'Submitted By', value: interaction.user.tag, inline: true },
			{ name: 'Mission Name', value: missionName, inline: true },
			{ name: 'Mission Type', value: missionType, inline: true },
			{ name: 'Mission Date', value: missionDate, inline: true },
			{ name: 'Mission Participants', value: missionParticipants, inline: false },
			{ name: 'Mission Notes', value: missionNotes, inline: false }
		);

	// Send the embed to a specific channel
	const channelId = '1315390276113662094'; // Replace with your channel ID
	const targetChannel = interaction.guild.channels.cache.get(channelId);

	if (targetChannel) {
		await targetChannel.send({ embeds: [embed] });
	}

	// Acknowledge the submission
	await interaction.reply({
		content: 'Your After Action Report has been submitted!',
		ephemeral: true
	});

}
}
if (!interaction.isCommand()) return;
if (!command) return;

if (interaction.user.bot) return interaction.reply({ content: 'Bots cannot use this command', ephemeral: true});
if( command.DevOnly && !Devs.includes(interaction.user.id.toString())) return interaction.reply({ content: 'Are you a spriggull brain or what? you are not allowed to use this command'});
if (command.OfficersOnly && !interaction.member.roles.cache.has('1315397239522459781')) return interaction.reply({ content: 'You must be an Officer to use this command', ephemeral: true });
if (command.host && !interaction.member.roles.cache.has('1315513718108328048')) return interaction.reply({ content: 'You must be a Host to use this command', ephemeral: true });
 try{  
await command.execute(interaction, client);
 } catch (error) {
console.error(error);
if (interaction.deferred || interaction.replied) {
return interaction.followUp({ content: 'There was an error while executing this command!\n' + error, ephemeral: true });
}
return interaction.reply({ content: 'There was an error while executing this command!\n' + error, ephemeral: true });

}
}, 
};
