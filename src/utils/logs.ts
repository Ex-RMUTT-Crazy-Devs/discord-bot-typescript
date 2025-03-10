export class Logs {
  static info(...msg: any[]) {
    console.log("[INFO]", new Date().toLocaleString(), ":", ...msg);
  }

  static error(...msg: any[]) {
    console.log("[ERROR]", new Date().toLocaleString(), ":", ...msg);
  }

  static warning(...msg: any[]) {
    console.log("[WARNING]", new Date().toLocaleString(), ":", ...msg);
  }
}
