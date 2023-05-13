import { FC } from "react";
import RemixIcon from "react-native-remix-icon";

type IconProps = {
  name: any;
  size: number;
  color: string;
};

export const Icon: FC<IconProps> = ({ name, size, color }) => {
  return <RemixIcon name={name} size={size} color={color} />;
};
