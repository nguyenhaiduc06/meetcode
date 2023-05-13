import { FC } from "react";
import { Feather } from "@expo/vector-icons";

type IconProps = {
  name: any;
  size: number;
  color: string;
};

export const Icon: FC<IconProps> = ({ name, size, color }) => {
  return <Feather name={name} size={size} color={color} />;
};
