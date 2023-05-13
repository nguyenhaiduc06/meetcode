import React, { FC } from "react";
import { View } from "react-native";

type SpaceProps = {
  width?: number;
  height?: number;
};

export const Space: FC<SpaceProps> = ({ width, height }) => {
  const flex = { flex: 1 };
  const sized = { width, height };
  const style = width || height ? sized : flex;
  return <View style={style} />;
};
