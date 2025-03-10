import { type Interaction, SlashCommandBuilder } from "discord.js";
import { reply } from "@/utils/discord";

export const data = new SlashCommandBuilder()
	.setName("pong")
	.setDescription("Replies with why!");

export const execute = async (interaction: Interaction) => {
	await reply(interaction, "why");
};
