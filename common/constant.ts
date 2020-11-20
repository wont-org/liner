import { join } from 'path'

export const CWD = process.cwd()
// 目标路径
export const TARGET_PATH = {
    package: `${CWD}/package.json`,
    eslintrc: `${CWD}/.eslintrc.js`,
}
// 当前项目路径
export const ROOT_DIR = join(__dirname, '../../')
export const CUR_PATH = {
    templateDir: join(ROOT_DIR, 'template'),
    eslintTS: join(ROOT_DIR, 'template/eslintTs.js'),
    eslintReact: join(ROOT_DIR, 'template/eslintReact.js'),
}
