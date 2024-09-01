const fs = require("fs");
const path = require("path");

const envExamplePath = path.join(__dirname, ".env.example");
const envPath = path.join(__dirname, ".env");

if (!fs.existsSync(envPath)) {
  fs.copyFileSync(envExamplePath, envPath);
}
