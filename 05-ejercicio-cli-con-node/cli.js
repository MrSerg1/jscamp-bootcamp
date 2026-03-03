import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

const directoryPath = process.argv[2] ?? ".";

/* Podemos evitar colocar todo el código en el IF con hacer la negación y retornar */
if (!process.permission?.has("fs.read", directoryPath)) {
  console.error(`No tienes permisos para leer el archivo ${directoryPath}`);
  process.exit(1);
}

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
/* Muy buena idea! */
const maxName = entries.reduce(
  (max, entry) => Math.max(max, entry.name.length),
  0,
);

/* Aquí no hace falta un if/else if, ya que solo puede haber una de las dos */
if (isAsc) {
  entries.sort((a, b) => a.name.localeCompare(b.name));
}

if (isDesc) {
  entries.sort((a, b) => b.name.localeCompare(a.name));
}

let filteredEntries = entries;

if (onlyFiles) {
  filteredEntries = entries.filter((entry) => !entry.isDirectory);
}

if (onlyFolders) {
  filteredEntries = entries.filter((entry) => entry.isDirectory);
}

for (const entry of filteredEntries) {
  const icon = entry.isDirectory ? "📁" : "📄";
  const size = entry.isDirectory ? "-" : ` ${entry.size}`;
  console.log(`${icon}  ${entry.name.padEnd(maxName + 5)} ${size}`);
}