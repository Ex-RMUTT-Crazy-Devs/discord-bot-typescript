import { Events, type GuildMember } from "discord.js";
import { client } from "../utils/controller";
import { Logs } from "../utils/logs";
import { env } from "@/env";

client.on(Events.GuildMemberAdd, async (member: GuildMember) => {
	try {
		const guild = member.guild;

		const role = await guild.roles.fetch(env.DEFAULT_ROLE_ID);
		if (role) {
			await member.roles.add(role);
			Logs.info(`[guildMemberAdd] เพิ่ม role ${role.name} ให้ ${member.user.id}`);
		} else {
			Logs.warning("[guildMemberAdd] ไม่พบ role ที่กำหนดบน server");
		}
	} catch (error) {
		Logs.error("[guildMemberAdd]", error);
	}
});
