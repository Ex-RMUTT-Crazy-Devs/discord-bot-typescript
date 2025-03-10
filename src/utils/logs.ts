export const Logs = {
	info(...msg: unknown[]): void {
		console.log("[INFO]", new Date().toLocaleString(), ":", ...msg);
	},

	error(...msg: unknown[]): void {
		console.error("[ERROR]", new Date().toLocaleString(), ":", ...msg);
	},

	warning(...msg: unknown[]): void {
		console.warn("[WARNING]", new Date().toLocaleString(), ":", ...msg);
	},
};
