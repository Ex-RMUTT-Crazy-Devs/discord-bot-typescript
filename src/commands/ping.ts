import { type Interaction, SlashCommandBuilder } from "discord.js";
import { reply } from "@/utils/discord";

export const data = new SlashCommandBuilder()
	.setName("ping")
	.setDescription("Replies with Pong!");

export const execute = async (interaction: Interaction) => {
	await reply(interaction, "จะ ping ทำไมหละ?");
};
