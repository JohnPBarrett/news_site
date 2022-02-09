import React from "react";
import { ReactComponent as UpArrow } from "./arrow-up.svg";
import { ReactComponent as DownArrow } from "./arrow-down.svg";

export const UpArrowSVG = (props) => {
  return <UpArrow className={props.className} />;
};

export const DownArrowSVG = (props) => {
  return <DownArrow className={props.className} />;
};
