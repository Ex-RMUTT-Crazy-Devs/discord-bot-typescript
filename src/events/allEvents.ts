import clientReady from "@/events/clientReady";
import guildMemberAdd from "@/events/guildMemberAdd";
import interactionCreate from "@/events/interactionCreate";
import messageCreate from "@/events/messageCreate";
import type { ClientEvents } from "discord.js";

export const createListener = <T extends keyof ClientEvents>(
	type: "once" | "on",
	event: T,
	callback: (...args: ClientEvents[T]) => void,
) => ({
	type,
	event,
	callback,
});

export const events = [
	clientReady,
	guildMemberAdd,
	interactionCreate,
	messageCreate,
];
