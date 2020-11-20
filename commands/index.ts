#!/usr/bin/env node

import {
    command, parse, version,
} from 'commander'
import {
    version as pkgVersion, name,
} from '../package.json'

// commands
import { init } from './init'
// import { cz } from './cz'
version(`${name} ${pkgVersion}`)

command('init').description('Init project config').action(init)

// command('cz')
//   .description('Git commit lint, which provide command line interaction')
//   .action(cz)

parse()
