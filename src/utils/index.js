export { default as isExternalURL } from './isExternalURL';

export const SIZE_400_225 = '400x225';
export const SIZE_HERO = '860x580';
export const SIZE_75_75 = '75x75';

export const imageAcceptableFormats = [SIZE_400_225, SIZE_75_75, SIZE_HERO];
export const lightBoxAcceptableKeys = ['ArrowLeft', 'ArrowRight', 'Escape'];

export const stringIncludesHTML = (s) => s.match(/<[^>]+>/g);
