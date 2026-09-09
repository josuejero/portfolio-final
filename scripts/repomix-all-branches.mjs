import { execFileSync, spawnSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const repositoryRoot = resolve(import.meta.dirname, '..');
const outputDirectory = join(repositoryRoot, 'repomix-outputs');
const temporaryRoot = mkdtempSync(join(tmpdir(), 'repomix-branches-'));

function git(args, options = {}) {
  return execFileSync('git', args, {
    cwd: repositoryRoot,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'inherit'],
    ...options,
  }).trim();
}

function outputName(branch) {
  // Git permits '/' in branch names; percent encoding makes every name a single file.
  return `repomix-${encodeURIComponent(branch)}.xml`;
}

const branches = git(['for-each-ref', '--format=%(refname:short)', 'refs/heads'])
  .split('\n')
  .filter(Boolean);

if (branches.length === 0) {
  throw new Error('No local branches were found.');
}

mkdirSync(outputDirectory, { recursive: true });
const manifest = [];

try {
  for (const branch of branches) {
    const worktreePath = join(temporaryRoot, `branch-${manifest.length}`);
    const outputFile = outputName(branch);
    const temporaryOutput = join(worktreePath, 'repomix-output.xml');

    console.log(`Packing ${branch}...`);
    execFileSync('git', ['worktree', 'add', '--detach', '--quiet', worktreePath, branch], {
      cwd: repositoryRoot,
      stdio: 'inherit',
    });

    try {
      const configPath = join(worktreePath, 'repomix.config.json');
      const arguments_ = ['--yes', 'repomix@latest', '--output', temporaryOutput];
      if (existsSync(configPath)) arguments_.push('--config', configPath);

      const result = spawnSync('npx', arguments_, {
        cwd: worktreePath,
        stdio: 'inherit',
      });
      if (result.status !== 0) {
        throw new Error(`Repomix failed for branch "${branch}".`);
      }

      copyFileSync(temporaryOutput, join(outputDirectory, outputFile));
      manifest.push({
        branch,
        commit: git(['rev-parse', branch]),
        file: outputFile,
      });
    } finally {
      execFileSync('git', ['worktree', 'remove', '--force', worktreePath], {
        cwd: repositoryRoot,
        stdio: 'inherit',
      });
    }
  }

  writeFileSync(join(outputDirectory, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`Created ${manifest.length} Repomix file(s) in ${outputDirectory}`);
} finally {
  rmSync(temporaryRoot, { recursive: true, force: true });
  execFileSync('git', ['worktree', 'prune'], { cwd: repositoryRoot, stdio: 'inherit' });
}
