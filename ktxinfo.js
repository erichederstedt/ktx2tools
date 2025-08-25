#!/usr/bin/env node

const { spawn } = require("child_process");
const path = require("path");

function getExecutableName() {
  const os = process.platform;
  switch (os) {
    case "win32":
      return "ktxinfo.exe";
    case "darwin":
      return "ktxinfo"; // Not sure if this works
    case "linux":
      return "ktxinfo";
    default:
      return null;
  }
}

function main() {
  const executableName = getExecutableName();

  if (!executableName) {
    console.error(`Error: Unsupported operating system '${process.platform}'.`);
    process.exit(1);
  }

  const executablePath = path.join(__dirname, "bin", executableName);

  const args = process.argv.slice(2);

  console.log(`Running: ${executablePath} with args: [${args.join(", ")}]`);

  const child = spawn(executablePath, args, {
    stdio: "inherit",
  });

  child.on("error", (err) => {
    console.error(
      `Failed to start subprocess. Make sure '${executablePath}' is executable.`
    );
    console.error(err);
    process.exit(1);
  });

  child.on("close", (code) => {
    console.log(`Subprocess exited with code ${code}`);
    process.exit(code);
  });
}

main();
