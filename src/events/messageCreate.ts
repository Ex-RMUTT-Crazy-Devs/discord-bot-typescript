import { type Client, Events } from "discord.js";
import { Logs } from "@/utils/logs";
import { env } from "@/env";

export default (client: Client) => {
	client.once(Events.MessageCreate, async (message) => {
		if (message.author.bot) return;

		if (message.channelId !== env.BOT_SEND_MSG_CHANNEL_ID) return;

		// anonymous send
		try {
			const formData = new FormData();
			formData.append(
				"payload_json",
				JSON.stringify({ content: message.content }),
			);

			const files = message.attachments.map((attachment) => ({
				url: attachment.url,
				name: attachment.name,
			}));

			// ดึงไฟล์จาก URL และแนบใน FormData
			const fetchPromises = files.map(async (file, index) => {
				const response = await fetch(file.url);
				if (!response.ok) throw new Error(`Failed to fetch file: ${file.url}`);
				const blob = await response.blob();
				formData.append(`files[${index}]`, blob, file.name);
			});
			await Promise.all(fetchPromises);

			await message.delete();

			await fetch(env.WEBHOOK_URL_CHANNEL_ANONYMOUS, {
				method: "POST",
				body: formData,
			});
		} catch (error) {
			Logs.error("[MessageCreate]", error);
		}
	});
};
