import {
  EmbedBuilder,
  SlashCommandBuilder,
  TextChannel,
  type Interaction,
} from "discord.js";
const participants = new Set<string>();
export const data = new SlashCommandBuilder()
  .setName("event")
  .setDescription("สร้าง event พร้อม reaction ให้เข้าร่วม")
  .addStringOption((option) =>
    option.setName("title").setDescription("หัวข้อ event").setRequired(true)
  )
  .addIntegerOption((option) =>
    option.setName("minutes").setDescription("เริ่มในกี่นาที").setRequired(true)
  );

export const execute = async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const title = interaction.options.getString("title", true);
  const minutes = interaction.options.getInteger("minutes", true);

  const embed = new EmbedBuilder()
    .setTitle(`📅 Event: ${title}`)
    .setDescription(
      `กด ✅ ถ้าจะเข้าร่วมภายใน ${minutes} นาที!\nกด ❌ ถ้าไม่เข้าร่วม`
    )
    .setColor(0x00ae86);

  const eventMsgResp = await interaction.reply({
    embeds: [embed],
    withResponse: true,
  });
  const eventMsg = eventMsgResp.resource?.message;
  if (!eventMsg) return;

  await eventMsg.react("✅");
  await eventMsg.react("❌");

  const collector = eventMsg.createReactionCollector({
    time: minutes * 60 * 1000,
    filter: (reaction, user) =>
      !user.bot && ["✅", "❌"].includes(reaction.emoji.name!),
  });

  collector.on("collect", (reaction, user) => {
    if (reaction.emoji.name === "✅") {
      participants.add(user.id);
    } else if (reaction.emoji.name === "❌") {
      participants.delete(user.id);
    }
  });

  collector.on("end", async () => {
    const mentionList = [...participants].map((id) => `<@${id}>`).join(" ");
    const reminderMsg = mentionList
      ? `🔔 ถึงเวลาแล้ว! คนที่ร่วม event: ${mentionList}`
      : "😢 ไม่มีใครร่วม event นี้เลย";

    const channel = interaction.channel as TextChannel;
    await channel.send(reminderMsg);
    participants.clear();
  });
};
