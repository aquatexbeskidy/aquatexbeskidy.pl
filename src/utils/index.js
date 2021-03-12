export { default as isExternalURL } from './isExternalURL';

export const SIZE_HERO = '860x580';
export const SIZE_230_170 = '230x170';
export const SIZE_150_150 = '150x150';

export const imageAcceptableFormats = [SIZE_230_170, SIZE_150_150, SIZE_HERO];

export const stringIncludesHTML = (s) => s.match(/<[^>]+>/g);
