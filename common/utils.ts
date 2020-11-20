import chalk from 'chalk'
import { copySync } from 'fs-extra'

export const copy = (
    moveFiles: string[],
    curDir: string,
    targetDir: string,
): void => {
    moveFiles.forEach((file) => {
        copySync(`${curDir}/${file}`, `${targetDir}/${file}`)
        console.log(`\n copy ${chalk.green(file)} success!`)
    })
}
