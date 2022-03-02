import React from 'react';
import { ReactComponent as UpArrow } from './arrow-up.svg';
import { ReactComponent as DownArrow } from './arrow-down.svg';

export function UpArrowSVG(props) {
  const { className } = props;
  return <UpArrow className={className} />;
}

export function DownArrowSVG(props) {
  const { className } = props;

  return <DownArrow className={className} />;
}
