import React from 'react';
import {SvgXml} from 'react-native-svg';

import {svgList} from '../../assets/svg';

export interface SvgIconProps {
  source: keyof typeof svgList;
  width?: number;
  height?: number;
}

const SvgIcon: React.FC<SvgIconProps> = ({source, width = 22, height = 22}) => {
  if (!source) {
    return null;
  }

  return (
    <SvgXml xml={svgList[source]} width={`${width}`} height={`${height}`} />
  );
};

export default SvgIcon;
