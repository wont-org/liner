import { join } from 'path'
import { bootstrap } from 'commitizen/dist/cli/git-cz'
import { ROOT_DIR } from '../common/constant'

export const cz = () => {
    bootstrap({
        cliPath: join(ROOT_DIR, 'node_modules/commitizen'),
        // this is new
        config: {
            path: 'cz-conventional-changelog',
        },
    })
}
