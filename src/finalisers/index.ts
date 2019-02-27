import { Bundle as MagicStringBundle } from 'magic-string';
import { ChunkDependencies, ChunkExports } from '../Chunk';
import { OutputOptions, RollupWarning } from '../rollup/types';
import amd from './amd';
import c74max from './c74max';
import cjs from './cjs';
import esm from './esm';
import iife from './iife';
import system from './system';
import umd from './umd';

export interface FinaliserOptions {
	dependencies: ChunkDependencies;
	dynamicImport: boolean;
	exports: ChunkExports;
	hasExports: boolean;
	indentString: string;
	intro: string;
	isEntryModuleFacade: boolean;
	namedExportsMode: boolean;
	needsAmdModule: boolean;
	outro: string;
	usesTopLevelAwait: boolean;
	varOrConst: 'var' | 'const';
	warn(warning: RollupWarning): void;
}

export type Finaliser = (
	magicString: MagicStringBundle,
	finaliserOptions: FinaliserOptions,
	options: OutputOptions
) => MagicStringBundle;

export default { system, amd, cjs, es: esm, iife, umd, c74max } as {
	[format: string]: Finaliser;
};
