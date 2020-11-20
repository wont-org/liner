import { prompt } from 'inquirer'
import {
    copySync, readJsonSync, writeJsonSync,
} from 'fs-extra'
import {
    CWD, TARGET_PATH, CUR_PATH,
} from '../common/constant'
import { copy } from '../common/utils'

const questions = [
    {
        name: 'commit',
        message: 'use commitlint ?',
        type: 'confirm',
        default: true,
    },
    {
        name: 'eslint',
        message: 'Select project eslint type',
        type: 'list',
        choices: ['typescript', 'react', 'none'],
        default: 'typescript',
    },
    // {
    //     name: 'stylelint',
    //     message: 'use stylelint ?',
    //     type: 'confirm',
    //     default: true
    // },
]
const lintStage = {
    '*.(jsx?|tsx?|mdx?)': ['prettier --write'],
    '*.(jsx?|tsx?)': ['eslint --cache --fix'],
}
const huskyDep = {
    husky: '^4.3.0',
    'lint-staged': '^10.5.1',
}
const commitDep = {
    '@commitlint/cli': '^11.0.0',
    '@commitlint/config-conventional': '^11.0.0',
    commitizen: '^4.2.2',
    'cz-conventional-changelog': '^3.3.0',
}

const eslintBaseDep = {
    '@typescript-eslint/eslint-plugin': '^4.8.1',
    '@typescript-eslint/parser': '^4.8.1',
    eslint: '^7.13.0',
    'eslint-config-airbnb': '^18.2.1',
    'eslint-config-prettier': '^6.15.0',
    'eslint-plugin-import': '^2.22.1',
    'eslint-plugin-prettier': '^3.1.4',
    prettier: '^2.2.0',
}

const eslintReactDep = {
    'eslint-plugin-jsx-a11y': '^6.3.1',
    'eslint-plugin-react': '^7.20.6',
    'eslint-plugin-react-hooks': '^4.0.8',
}

export type EslintType = 'typescript' | 'react' | 'vue' | 'none'
interface Answers {
    eslint: EslintType
    commit: boolean
}
export const init = async () => {
    let devDependencies = {}
    // eslint
    const { eslint, commit }: Answers = await prompt(questions)
    if (eslint === 'typescript') {
        copySync(CUR_PATH.eslintTS, TARGET_PATH.eslintrc)
    }
    if (eslint === 'react') {
        copySync(CUR_PATH.eslintReact, TARGET_PATH.eslintrc)
        devDependencies = {
            ...devDependencies,
            ...eslintReactDep,
        }
    }
    // eslint
    if (eslint !== 'none') {
        const lintConfig = [
            '.prettierignore',
            '.eslintignore',
            '.prettierrc.js',
        ]
        copy(lintConfig, CUR_PATH.templateDir, CWD)
        devDependencies = {
            ...devDependencies,
            ...eslintBaseDep,
        }
    }
    // commit lint
    if (commit) {
        devDependencies = {
            ...devDependencies,
            ...commitDep,
        }
        const lintCommit = ['.cz.json', '.huskyrc', 'commitlint.config.js']
        copy(lintCommit, CUR_PATH.templateDir, CWD)
    }
    // husky
    if (commit || eslint !== 'none') {
        devDependencies = {
            ...devDependencies,
            ...huskyDep,
        }
    }

    // 最后读写package
    const pkg = readJsonSync(TARGET_PATH.package)
    pkg['lint-staged'] = lintStage
    pkg.devDependencies = {
        ...pkg.devDependencies,
        ...devDependencies,
    }
    writeJsonSync(TARGET_PATH.package, pkg, {
        spaces: 4,
    })
    // others
    const lintOthers = ['.editorconfig']
    copy(lintOthers, CUR_PATH.templateDir, CWD)
}
