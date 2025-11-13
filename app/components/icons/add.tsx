import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const AddIcon = (props: SvgProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.7778 13H6.22222C5.82741 13 5.5 12.5467 5.5 12C5.5 11.4533 5.82741 11 6.22222 11H17.7778C18.1726 11 18.5 11.4533 18.5 12C18.5 12.5467 18.1726 13 17.7778 13Z"
      fill="white"
    />
    <path
      d="M12.5 19C11.9533 19 11.5 18.6474 11.5 18.2222V5.77778C11.5 5.35259 11.9533 5 12.5 5C13.0467 5 13.5 5.35259 13.5 5.77778V18.2222C13.5 18.6474 13.0467 19 12.5 19Z"
      fill="white"
    />
  </svg>
);

export default AddIcon;
