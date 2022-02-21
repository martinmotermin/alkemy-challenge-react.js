import React from "react";
import { Oval } from "react-loader-spinner";

const Loading = ({ heigth, width }) => {
  return <Oval color="#ffffff" heigth={heigth} width={width} />;
};

export default Loading;
