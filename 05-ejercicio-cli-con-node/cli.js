import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

// Aquí irá el código

const directoryPath = process.argv[2] ?? ".";
const userOrder = process.argv[3] ?? "";

const formatBytes = (bytes) => {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes >= 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  }
};

const files = await readdir(directoryPath);

const entries = await Promise.all(
  files.map(async (file) => {
    const filePath = join(directoryPath, file);
    const fileStat = await stat(filePath);
    return {
      name: file,
      size: formatBytes(fileStat.size),
      isDirectory: fileStat.isDirectory(),
    };
  }),
);
// Calcular el ancho máximo del nombre para alinear la salida
const maxName = entries.reduce(
  (max, entry) => Math.max(max, entry.name.length),
  0,
);

if (userOrder === "--asc") {
  entries.sort((a, b) => a.name.localeCompare(b.name));
} else if (userOrder === "--desc") {
  entries.sort((a, b) => b.name.localeCompare(a.name));
}

for (const entry of entries) {
  const icon = entry.isDirectory ? "📁" : "📄";
  const size = entry.isDirectory ? "-" : ` ${entry.size}`;
  console.log(`${icon}  ${entry.name.padEnd(maxName + 5)} ${size}`);
}
