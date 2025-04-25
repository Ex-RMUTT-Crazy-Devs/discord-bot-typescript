import { env } from "@/env";
import {
  Client,
  Collection,
  GatewayIntentBits,
  type Interaction,
  REST,
  type RESTPostAPIApplicationCommandsJSONBody,
  Routes,
  type SlashCommandBuilder,
  type SlashCommandOptionsOnlyBuilder,
} from "discord.js";

import { RegisterEvents } from "@/utils/events";
import { Logs } from "@/utils/logs";

Logs.info("Running in", env.NODE_ENV);

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
});

// Event
RegisterEvents(client);

export const commands = new Collection<
  string,
  {
    data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;
    execute: (interaction: Interaction) => void | Promise<void>;
  }
>();
const slashCommands: RESTPostAPIApplicationCommandsJSONBody[] = [];

(async () => {
  const commandPromises = [
    import("@/commands/ping"),
    import("@/commands/pong"),
    import("@/commands/event"),
  ];

  const cmds = await Promise.all(commandPromises);

  for (const cmd of cmds) {
    commands.set(cmd.data.name, { data: cmd.data, execute: cmd.execute });
    slashCommands.push(cmd.data.toJSON());
  }

  try {
    const rest = new REST().setToken(env.DISCORD_TOKEN);

    Logs.info(
      `Started refreshing ${slashCommands.length} application (/) commands.`
    );

    await rest.put(
      Routes.applicationGuildCommands(env.CLIENT_ID, env.GUILD_ID),
      {
        body: slashCommands,
      }
    );

    Logs.info(
      `Successfully reloaded ${slashCommands.length} application (/) commands.`
    );
  } catch (error) {
    Logs.error("Routes.applicationGuildCommands", error);
  }
})();
