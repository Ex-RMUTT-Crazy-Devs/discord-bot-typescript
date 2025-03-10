import { MessageFlags, type Interaction } from "discord.js";

export const reply = async (
	interaction: Interaction,
	content: string,
	_private = true,
) => {
	if (interaction.isChatInputCommand()) {
		const rp = await interaction.reply({
			content,
			...(_private && { flags: MessageFlags.Ephemeral }),
		});

		if (_private) {
			setTimeout(() => {
				rp.delete();
			}, 1000 * 30);
		}
	}
};
