import {
	Client,
	Collection,
	GatewayIntentBits,
	REST,
	type RESTPostAPIApplicationCommandsJSONBody,
	Routes,
} from "discord.js";
import { env } from "@/env";

import { readdirSync } from "node:fs";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { Logs } from "@/utils/logs";

Logs.info("Running in", env.NODE_ENV);

export const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.MessageContent,
	],
});

readdirSync(path.join(__dirname, "../events/"))
	.filter((file) => file.endsWith(".ts"))
	.forEach((file) => {
		import(`../events/${file.replace(".ts", "")}`);
	});

export const commands = new Collection();
const slashCommands: RESTPostAPIApplicationCommandsJSONBody[] = [];

readdir(path.join(__dirname, "../commands/"))
	.then((files) => files.filter((file) => file.endsWith(".ts")))
	.then(async (files) => {
		for (const file of files) {
			const { data, execute } = await import(
				`../commands/${file.replace(".ts", "")}`
			);

			if (data && execute) {
				commands.set(data.name, { data, execute });
				slashCommands.push(data.toJSON());
			} else {
				Logs.warning(
					`The command at commands/${file} is missing a required "data" or "execute" property.`,
				);
			}
		}
	})
	.then(() => {
		putSlashCommands();
	});

const putSlashCommands = async () => {
	try {
		const rest = new REST().setToken(env.DISCORD_TOKEN);

		Logs.info(
			`Started refreshing ${slashCommands.length} application (/) commands.`,
		);

		await rest.put(
			Routes.applicationGuildCommands(env.CLIENT_ID, env.GUILD_ID),
			{ body: slashCommands },
		);

		Logs.info(
			`Successfully reloaded ${slashCommands.length} application (/) commands.`,
		);
	} catch (error) {
		Logs.error("Routes.applicationGuildCommands", error);
	}
};
