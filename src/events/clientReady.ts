import { Events } from "discord.js";
import { Logs } from "@/utils/logs";
import { createListener } from "@/utils/eventListener";

const run = "once";
const eventType = Events.ClientReady;

export default createListener(run, eventType, async (c) => {
	Logs.info(`Ready! Logged in as ${c.user.tag}`);
});
