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
