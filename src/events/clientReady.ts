import { Events } from "discord.js";
import { Logs } from "@/utils/logs";
import type { Event } from "@/utils/events";

const type = Events.ClientReady;

const event: Event<typeof type> = {
	name: type,
	once: true,
	execute: (client) => {
		Logs.info(`Ready! Logged in as ${client.user.tag}`);
	},
};

export default event;
