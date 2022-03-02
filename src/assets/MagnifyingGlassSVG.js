import React from 'react';
import { ReactComponent as MagnifyingGlass } from './magnifying-glass.svg';

function MagnifyingGlassSVG(props) {
  const { className } = props;
  return <MagnifyingGlass className={className} />;
}

export default MagnifyingGlassSVG;
