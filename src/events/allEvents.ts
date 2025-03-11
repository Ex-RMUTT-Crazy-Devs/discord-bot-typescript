import clientReady from "@/events/clientReady";
import guildMemberAdd from "@/events/guildMemberAdd";
import interactionCreate from "@/events/interactionCreate";
import messageCreate from "@/events/messageCreate";

export const events = [
	clientReady,
	guildMemberAdd,
	interactionCreate,
	messageCreate,
];
