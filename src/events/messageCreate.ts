import { Events, Message, OmitPartialGroupDMChannel } from "discord.js";
import { client } from "../utils/controller";
import { Logs } from "../utils/logs";

client.on(
  Events.MessageCreate,
  async (message: OmitPartialGroupDMChannel<Message<boolean>>) => {
    if (message.author.bot) return;

    // anonymous send
    if (message.channelId === process.env.BOT_SEND_MSG_CHANNEL_ID) {
      try {
        const formData = new FormData();
        formData.append(
          "payload_json",
          JSON.stringify({ content: message.content })
        );

        const files = message.attachments.map((attachment) => ({
          url: attachment.url,
          name: attachment.name,
        }));

        // ดึงไฟล์จาก URL และแนบใน FormData
        const fetchPromises = files.map(async (file, index) => {
          const response = await fetch(file.url);
          if (!response.ok)
            throw new Error(`Failed to fetch file: ${file.url}`);
          const blob = await response.blob();
          formData.append(`files[${index}]`, blob, file.name);
        });
        await Promise.all(fetchPromises);

        await message.delete();

        await fetch(process.env.WEBHOOK_URL_CHANNEL_ANONYMOUS!, {
          method: "POST",
          body: formData,
        });
      } catch (error) {
        Logs.error("[MessageCreate]", error);
      }
    }
  }
);
