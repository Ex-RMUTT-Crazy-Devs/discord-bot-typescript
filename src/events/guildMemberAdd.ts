import { Events } from "discord.js";
import { Logs } from "@/utils/logs";
import { env } from "@/env";
import { createListener } from "@/utils/eventListener";

const run = "on";
const eventType = Events.GuildMemberAdd;

export default createListener(run, eventType, async (member) => {
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
