// ─────────────────────────────────────────────────────────────────────────────
// Import
// ─────────────────────────────────────────────────────────────────────────────

import PropTypes from 'prop-types';
import React from 'react';

import { imageAcceptableFormats } from '~utils';

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

const [SIZE_230_170] = imageAcceptableFormats;

const ImagePlaceholder = ({ backgroundColor, textColor, fontSize, format, showText }) => {
  const [width, height] = format.split('x');

  const placeholderTextMarkup = `
    <text
      font-size="${fontSize}"
      text-anchor="middle"
      fill="${textColor}"
      dy="10.5"
      y="50%"
      x="50%"
    >
      ${width}x${height}
    </text>
  `;

  const placeholderMarkup = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 ${width} ${height}"
        height="${height}"
        width="${width}"
      >
        <rect
          fill="${backgroundColor}"
          height="${height}"
          width="${width}"
        />

        ${showText && placeholderTextMarkup}
      </svg>
    `;

  const useEncodeBrackets = (s) => s.replace(/\(/g, '%28').replace(/\)/g, '%29');
  const useStripTabsAndLines = (s) => s.replace(/[\t\n\r]/gim, '');
  const useNormalizeQuotes = (s) => s.replace(/'/gim, '\\i');
  const useCondenseSpaces = (s) => s.replace(/\s\s+/g, ' ');

  const stripedMarkup = useStripTabsAndLines(placeholderMarkup);
  const condensedMarkup = useCondenseSpaces(stripedMarkup);
  const normalizedMarkup = useNormalizeQuotes(condensedMarkup);
  const encodeBrackets = useEncodeBrackets(encodeURIComponent(normalizedMarkup));

  return (
    <img
      src={`data:image/svg+xml;charset=UTF-8,${encodeBrackets}`}
      height={height}
      width={width}
      alt=""
    />
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Extended Default Styles
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// Others
// ─────────────────────────────────────────────────────────────────────────────

ImagePlaceholder.displayName = 'ImagePlaceholder';

ImagePlaceholder.propTypes = {
  format: PropTypes.oneOf(imageAcceptableFormats).isRequired,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  fontSize: PropTypes.string,
  showText: PropTypes.bool,
};

ImagePlaceholder.defaultProps = {
  format: SIZE_230_170,
  backgroundColor: '#fafafa',
  textColor: '#000000',
  fontSize: '12px',
  showText: true,
};

export default ImagePlaceholder;
