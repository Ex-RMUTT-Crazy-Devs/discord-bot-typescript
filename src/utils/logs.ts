import colors from 'colors'

export const Logs = {
	info(...msg: unknown[]): void {
		console.log(`[${colors.green('INFO')}]`, new Date().toLocaleString(), ":", ...msg);
	},

	error(...msg: unknown[]): void {
		console.error(`[${colors.red('ERROR')}]`, new Date().toLocaleString(), ":", ...msg);
	},

	warning(...msg: unknown[]): void {
		console.warn(`[${colors.yellow('WARNING')}]`, new Date().toLocaleString(), ":", ...msg);
	},
};
