import type { Client, ClientEvents } from "discord.js";
import { Logs } from "@/utils/logs";

// Events
import clientReady from "@/events/clientReady";
import guildMemberAdd from "@/events/guildMemberAdd";
import interactionCreate from "@/events/interactionCreate";
import messageCreate from "@/events/privateMessage";

export const events = [
	clientReady,
	guildMemberAdd,
	interactionCreate,
	messageCreate,
] as Event<keyof ClientEvents>[];

export interface Event<T extends keyof ClientEvents> {
	name: string;
	once?: boolean;
	execute: (...args: ClientEvents[T]) => void | Promise<void>;
}

export const RegisterEvents = async (client: Client) => {
	for (const event of events) {
		Logs.info(`register - event - ${event.name}`);

		if (event.once) {
			client.once(event.name, event.execute);
		} else {
			client.on(event.name, event.execute);
		}
	}
};
