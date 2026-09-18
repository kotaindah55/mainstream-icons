import { spawnSync } from 'child_process';
import { readFileSync } from 'fs';
import type { ManifestConfig } from './version-bump.mjs';

let { version } = JSON.parse(readFileSync('manifest.json', 'utf8')) as ManifestConfig;

spawnSync('git', ['tag', '-a', version, '-f', '-m', `'${version}'`]);
spawnSync('git', ['push', '-f', 'origin', version]);