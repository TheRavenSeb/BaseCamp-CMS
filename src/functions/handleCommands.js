const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
//const { Logtail } = require("@logtail/node");
//const logtail = new Logtail("XiL5Vq7qxdBP3pYTnLzqkMCX");
const fs = require("fs");

require('dotenv').config();
const clientId = "1318660296658780220";  

module.exports = (client) => {
	client.handleCommands = async (commandFiles, path) => {
		client.commandArray = [];
		
			for (var file of commandFiles) {
				const command = require(`../commands/${file}`);
				console.log(`[Discord bot]: Loaded [${file}] successfully.`);
				client.commands.set(command.data.name, command);
				client.commandArray.push(command.data.toJSON());
			}
		

		const rest = new REST({ version: "9" }).setToken(process.env.token);
		(async () => {
			try {
				console.log("[Discord bot]:starting command refresh");
				//console.info(chalk.green("[Discord bot]:starting command refresh"));
				//logtail.flush();

				await rest.put(Routes.applicationCommands(clientId), { body: client.commandArray });

				console.log("[Discord bot]:command refresh Finished");
				//console.info(chalk.green("[Discord bot]:command refresh Finished"));
			} catch (error) {
				console.error(error);

				
				//logtail.flush();
			}
		})();
	};
};