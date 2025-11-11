import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const CarIcon = (props: SvgProps) => (
  <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}>
    <Path d="M0 31.9998H32V-0.000234604H0V31.9998Z" fill="white" />
  </Svg>
);

export default CarIcon;
