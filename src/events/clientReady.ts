import { type Client, Events } from "discord.js";
import { Logs } from "@/utils/logs";

export default (client: Client) => {
	client.once(Events.ClientReady, async (c) => {
		Logs.info(`Ready! Logged in as ${c.user.tag}`);
	});
};
