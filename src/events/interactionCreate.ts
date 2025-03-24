import { Events, MessageFlags, type ClientEvents } from "discord.js";
import { commands } from "@/utils/controller";
import { reply } from "@/utils/discord";
import { Logs } from "@/utils/logs";
import type { Event } from "@/utils/events";

const type = Events.InteractionCreate;

const event: Event<typeof type> = {
	name: type,
	once: false,
	execute: async (interaction) => {
		if (!interaction.isChatInputCommand()) return;

		const command = commands.get(interaction.commandName) as
			| Event<keyof ClientEvents>
			| undefined;

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
					flags: MessageFlags.Ephemeral,
				});
			} else {
				await reply(
					interaction,
					"There was an error while executing this command!",
				);
			}
		}
	},
};

export default event;
