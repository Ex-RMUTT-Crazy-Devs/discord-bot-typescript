import { client } from "./utils/controller";
import { env } from "@/env";

client.login(env.DISCORD_TOKEN);
