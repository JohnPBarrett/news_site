import React from "react";
import { ReactComponent as MagnifyingGlass } from "./magnifying-glass.svg";

export const MagnifyingGlassSVG = (props) => {
  console.log(props);
  return <MagnifyingGlass className={props.className} />;
};
