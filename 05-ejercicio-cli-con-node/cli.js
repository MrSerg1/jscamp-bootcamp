import { readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'

// Aquí irá el código

const directoryPath = process.argv[2] ?? '.'

const formatBytes = (bytes) => {
    if (bytes < 1024) {
        return `${bytes} B`
    }
    if (bytes > 1024 ) {
        return `${(bytes / 1024).toFixed(2)} KB`
    }
}

const files = await readdir(directoryPath)

const entries = await Promise.all(
    files.map(async (file) => {
        const filePath = join(directoryPath, file)
        const fileStat = await stat(filePath)
        return {
            name: file,
            size: formatBytes(fileStat.size),
            isDirectory: fileStat.isDirectory(),
        }
    }
))

 for (const entry of entries) {
    const icon = entry.isDirectory ? '📁' : '📄'
    const size = entry.isDirectory ? '-' : ` ${entry.size}`
    console.log(`${icon}  ${entry.name.padEnd(20)} ${size}`)
 }