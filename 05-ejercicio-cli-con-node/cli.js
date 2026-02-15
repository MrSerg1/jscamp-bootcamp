import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

if (process.permission.has("fs.read")) {
  const directoryPath = process.argv[2] ?? ".";
  const args = process.argv.slice(2);

  const isAsc = args.includes("--asc");
  const isDesc = args.includes("--desc");
  const onlyFiles = args.includes("--files");
  const onlyFolders = args.includes("--folders");

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

  if (isAsc) {
    entries.sort((a, b) => a.name.localeCompare(b.name));
  } else if (isDesc) {
    entries.sort((a, b) => b.name.localeCompare(a.name));
  }

  let filteredEntries = entries;

  if (onlyFiles) {
    filteredEntries = entries.filter((entry) => !entry.isDirectory);
  } else if (onlyFolders) {
    filteredEntries = entries.filter((entry) => entry.isDirectory);
  }

  for (const entry of filteredEntries) {
    const icon = entry.isDirectory ? "📁" : "📄";
    const size = entry.isDirectory ? "-" : ` ${entry.size}`;
    console.log(`${icon}  ${entry.name.padEnd(maxName + 5)} ${size}`);
  }
} else {
  console.error("No tienes permisos para leer este archivo.")
}
