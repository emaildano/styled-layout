import { DefaultTheme } from 'styled-components';
import { createMediaQuery } from '../src';

const baseBreakpoints = {
  sm: { min: 0, max: 767 },
  md: { min: 768, max: 1023 },
  lg: { min: 1024, max: 1279 },
  xl: { min: 1280, max: Infinity },
};

const breakpoints = {
  ...baseBreakpoints,
  mdDown: { max: baseBreakpoints.md.max },
  mdUp: { min: baseBreakpoints.md.min },
  lgDown: { max: baseBreakpoints.lg.max },
  lgUp: { min: baseBreakpoints.lg.min },
};

export const media = createMediaQuery(breakpoints);

export const theme: DefaultTheme = {
  spacing: {
    xxsmall: '2px',
    xsmall: '4px',
    small: '8px',
    normal: '16px',
    default: '16px',
    medium: '24px',
    large: '32px',
    xlarge: '48px',
    xxlarge: '64px',
  },
  breakpoints,
  media,
};
