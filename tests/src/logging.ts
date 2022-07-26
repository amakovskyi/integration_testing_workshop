export const LOG_END = '\x1b[0m';
export const LOG_UNDERLINE = '\x1b[4m';
export const LOG_BOLD = '\x1b[1m';
export const LOG_FG_GREEN = '\x1b[32m';
export const LOG_FG_WHITE = '\x1b[37m';
export const LOG_FG_RED = '\x1b[31m';
export const LOG_FG_BLUE = '\x1b[34m';
export const LOG_BG_BLUE = '\x1b[44m';
export const LOG_BG_BLACK = '\x1b[40m';
export const LOG_FG_DIM = '\x1b[2m';
export const LOG_FG_GRAY = '\x1b[37m';

export class Logger {
  static println(count = 1) {
    for (let i = 0; i < count; i++) {
      process.stdout.write('\n');
    }
  }

  static print(text: any) {
    let value = text.toString();
    if (value.length > 32768) {
      value = value.substr(0, 32768);
    }
    process.stdout.write(value);
  }

  static log(text: any) {
    this.print(text);
    Logger.println();
  }

  static logError(text: string) {
    Logger.log(LOG_FG_RED + text + LOG_END);
  }

  static logBold(text: string) {
    Logger.log(LOG_BOLD + text + LOG_END);
  }

  static logData(text: string) {
    Logger.log(LOG_FG_WHITE + LOG_BG_BLACK + text.trim() + '\n' + LOG_END);
  }
}
