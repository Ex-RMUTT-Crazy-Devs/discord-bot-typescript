import { z } from "zod";

const envVariables = z.object({
	DISCORD_TOKEN: z.string().min(1),
	CLIENT_ID: z.string().min(1),
	GUILD_ID: z.string().min(1),
	DEFAULT_ROLE_ID: z.string().min(1),
	WEBHOOK_URL_CHANNEL_ANONYMOUS: z.string().url(),
	BOT_SEND_MSG_CHANNEL_ID: z.string().min(1),

	NODE_ENV: z
		.enum(["development", "test", "production"])
		.default("development"),
	// TODO: This is useless, you need to config the alpine docker somehow.
	// TZ: z.string().default("Asia/Bangkok"),
});

const EnvParse = envVariables.safeParse(process.env);

if (!EnvParse.success) {
	console.error(EnvParse.error);
	process.exit(1);
}

export const env = { ...EnvParse.data };
