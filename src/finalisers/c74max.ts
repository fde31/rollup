import { Bundle as MagicStringBundle } from 'magic-string';
import { NormalizedOutputOptions } from '../rollup/types';
import { FinaliserOptions } from './index';
import warnOnBuiltins from './shared/warnOnBuiltins';

export default function c74max(
	magicString: MagicStringBundle,
	{ dependencies, indentString: t, intro, outro, warn }: FinaliserOptions,
	options: NormalizedOutputOptions
) {
	const n = options.compact ? '' : '\n';
	warnOnBuiltins(warn, dependencies);

	const useStrict = options.strict !== false ? `${t}'use strict';${n}${n}` : ``;

	const wrapperIntro = `${useStrict}`;
	if (intro) magicString.prepend(intro);
	if (outro) magicString.append(outro);

	return magicString.prepend(wrapperIntro);
}
