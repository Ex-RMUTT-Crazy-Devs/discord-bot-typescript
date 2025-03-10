import { Events } from "discord.js";
import { client } from "../utils/controller";
import { Logs } from "../utils/logs";

client.once(Events.ClientReady, (c) => {
  Logs.info(`Ready! Logged in as ${c.user.tag}`);
});
