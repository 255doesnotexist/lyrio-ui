import fs from "fs";
import path from "path";
import url from "url";

// Inline flatten function to avoid dependency issues in compile-time
function flatten(obj: any, prefix = ""): Record<string, string> {
  const result: Record<string, string> = {};
  for (const key in obj) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(result, flatten(obj[key], newKey));
    } else {
      result[newKey] = obj[key];
    }
  }
  return result;
}

function escapeLocalizedMessage(text) {
  // Remove the "to-be-translated" prefix from message first
  if (text.startsWith("[TBT] ")) {
    text = text.replace("[TBT] ", "");
  }

  text = text.split("&").join("&amp;").split("<").join("&lt;");
  // The space is a workaround for that react-intl doesn't support empty message
  text = " " + text;
  return text;
}

interface LocalizedMessages {
  [key: string]: string | LocalizedMessages;
}

function escapeLocalizedMessages(object: string | LocalizedMessages) {
  if (typeof object === "string") return escapeLocalizedMessage(object);

  const result = {};
  for (const i in object) {
    result[i] = escapeLocalizedMessages(object[i]);
  }
  return result;
}

// Synchronous recursive directory reading
function readDirectoryRecursively(dir: string): string[] {
  const files: string[] = [];
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = path.resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      files.push(...readDirectoryRecursively(res));
    } else {
      files.push(res);
    }
  }
  return files;
}

const readMessageFile = (filename: string) => {
  try {
    return new Function(fs.readFileSync(filename, "utf-8"))();
  } catch (e) {
    throw new Error(`\n  Error in ${filename}:\n  ${e.stack}`);
  }
};

const currentFile = url.fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFile);

const result = {};
const localeDirectory = path.resolve(currentDirectory);
const files = readDirectoryRecursively(localeDirectory);

for (const absolutePath of files) {
  if (!absolutePath.endsWith(".js")) continue;

  const relativePath = path.relative(localeDirectory, absolutePath);
  const objectPath = relativePath.slice(0, -3); // Remove ".js"

  result[objectPath.split("/").join(".")] = escapeLocalizedMessages(readMessageFile(absolutePath));
}

export const messages = flatten(result);
