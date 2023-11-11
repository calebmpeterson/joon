import { clipboard } from "clipboard-sys";
import * as fs from "fs";
import * as os from "os";
import path from "path";

//----------------------------------------------------------------
// Configuration
//----------------------------------------------------------------
const HISTORY_FILENAME = path.join(os.homedir(), ".joon-history");
const POLL_INTERVAL = 1000;

//----------------------------------------------------------------
// Constants
//----------------------------------------------------------------
const URL_PATTERN = /https?:\/\/\S+/i;

//----------------------------------------------------------------
// Clipboard monitoring
//----------------------------------------------------------------

const hasUrl = (str: string) => {
  return URL_PATTERN.test(str);
};

const maybeAddToHistory = (content: string) => {
  if (hasUrl(content)) {
    fs.appendFile(
      HISTORY_FILENAME,
      content + os.EOL,
      { flag: "a" },
      (error) => {
        if (error) {
          console.warn(
            `Failed to add to history file: "${HISTORY_FILENAME}"`,
            error.message
          );
        }
      }
    );
  }
};

let prior: string;

const interval = setInterval(async () => {
  const content = await clipboard.readText();
  if (prior !== content) {
    maybeAddToHistory(content);
    prior = content;
  }
}, POLL_INTERVAL);

//----------------------------------------------------------------
// Clipboard retrieval
//----------------------------------------------------------------

//...

//----------------------------------------------------------------
// Process cleanup
//----------------------------------------------------------------
const onExit = () => {
  clearInterval(interval);
};

process.stdin.resume(); // so the program will not close instantly

process.on("SIGINT", onExit);
process.on("SIGUSR1", onExit);
process.on("SIGUSR2", onExit);
process.on("exit", onExit);
