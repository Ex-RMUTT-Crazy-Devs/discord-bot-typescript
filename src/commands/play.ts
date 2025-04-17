import { reply } from "@/utils/discord";
import { SlashCommandBuilder, type Interaction } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("play")
    .setDescription("มุบมิบมุบมิบ");

export const execute = async (interaction: Interaction) => {
    await reply(interaction, "จะ ping ทำไมหละ?");
};
