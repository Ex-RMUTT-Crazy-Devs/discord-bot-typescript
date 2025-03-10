import { Events } from "discord.js";
import { client, commands } from "@/utils/controller";
import { reply } from "@/utils/discord";
import { Logs } from "@/utils/logs";

client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	// what the fuck
	const command = commands.get(interaction.commandName);

	if (!command) {
		Logs.info(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		Logs.error("command", error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({
				content: "There was an error while executing this command!",
				ephemeral: true,
			});
		} else {
			await reply(
				interaction,
				"There was an error while executing this command!",
			);
		}
	}
});
