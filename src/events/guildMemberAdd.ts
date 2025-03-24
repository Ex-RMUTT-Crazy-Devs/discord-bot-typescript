import { Events } from "discord.js";
import { Logs } from "@/utils/logs";
import { env } from "@/env";
import type { Event } from "@/utils/events";

const type = Events.GuildMemberAdd;

const event: Event<typeof type> = {
	name: type,
	once: false,
	execute: async (member) => {
		try {
			const guild = member.guild;

			const role = await guild.roles.fetch(env.DEFAULT_ROLE_ID);
			if (role) {
				await member.roles.add(role);
				Logs.info(
					`[guildMemberAdd] เพิ่ม role ${role.name} ให้ ${member.user.id}`,
				);
			} else {
				Logs.warning("[guildMemberAdd] ไม่พบ role ที่กำหนดบน server");
			}
		} catch (error) {
			Logs.error("[guildMemberAdd]", error);
		}
	},
};

export default event;
