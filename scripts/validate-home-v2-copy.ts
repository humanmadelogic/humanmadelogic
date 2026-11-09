import {
  collectHomeV2CopyStrings,
  findPlaceholderCopy,
} from '../src/lib/hml/homeV2';

const isProduction = process.env.VERCEL_ENV === 'production';

if (isProduction) {
  const placeholders = findPlaceholderCopy(collectHomeV2CopyStrings());
  if (placeholders.length > 0) {
    console.error(
      '\n[home-v2] Production build blocked: placeholder copy must be replaced before deploy.\n',
    );
    placeholders.slice(0, 24).forEach((value) => console.error(`  - ${value}`));
    if (placeholders.length > 24) {
      console.error(`  ... and ${placeholders.length - 24} more`);
    }
    process.exit(1);
  }
}

console.log('[home-v2] Copy validation passed.');
