import * as React from 'react';
import styled, { css } from 'styled-components';
import { parseProps } from './utils';
import {
  WithResponsiveProps,
  WithTransientMediaProp,
  Theme,
  BaseProps,
} from '../types';

type Props = BaseProps &
  WithResponsiveProps<{
    size?: keyof Theme['spacing'];
    color?: keyof Theme['colors'];
  }>;

type TransientProps = WithTransientMediaProp<{
  $size?: keyof Theme['spacing'];
  $color?: keyof Theme['colors'];
}>;

type ThemedProps = TransientProps & { theme: Theme };

const ownProps = ['size', 'color', 'media'];

const hdivider = (p: ThemedProps) => css`
  width: 100%;
  height: 1px;
  margin: ${getSpacing(p)} 0 !important;
  background-color: ${getDividerColor(p)};
`;

const getSpacing = (p: ThemedProps) => p.theme.spacing[p.$size || 'default'];

const getDividerColor = (p: ThemedProps) => {
  if (p.$color && p.theme.colors) {
    return p.theme.colors[p.$color];
  } else if (p.theme.colors && p.theme.colors.divider) {
    return p.theme.colors.divider;
  }
  return '#ddd';
};

const getCSS = (p: ThemedProps) => hdivider(p);

const getResponsiveCSS = (p: ThemedProps) => {
  if (!p.$media || !p.theme.media) return '';
  return Object.entries(p.$media).map(([breakpoint, props]) => {
    const breakpointCSS = getCSS({ ...p, ...props });
    return p.theme.media[breakpoint]`${breakpointCSS}`;
  });
};

const DividerBase = styled.div.attrs({ 'data-spacer': 'true' })<TransientProps>`
  flex-shrink: 0;
  ${getCSS}
  ${getResponsiveCSS}
`;

const Divider: React.FC<Props> = ({ children, ...props }) => (
  <DividerBase {...parseProps(props, ownProps)} />
);

export default Divider;
