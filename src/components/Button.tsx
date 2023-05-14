import React, { FC } from "react";
import { TouchableOpacityProps } from "react-native";
import { styled } from "styled-components/native";
import { Icon } from "./Icon";
import { useTheme } from "../hooks";

const heightBySize = {
  sm: 32,
  md: 40,
  lg: 48,
};

const fontSizeBySize = {
  sm: 13,
  md: 15,
  lg: 17,
};

type ButtonProps = TouchableOpacityProps & {
  iconName?: string;
  label?: string;
  labelColor?: string;
  borderColor?: string;
  backgroundColor?: string;
  size?: "sm" | "md" | "lg";
};

const Text = styled.Text<{ color: string; size: number }>`
  font-size: ${(p) => p.size}px;
  font-weight: 500;
  color: ${(p) => p.color};
`;

const StyledTouchableOpacity = styled.TouchableOpacity<{
  color: string;
  height: number;
  width?: number;
  borderColor: string;
}>`
  background-color: ${(p) => p.color};
  flex-direction: row;
  gap: 6px;
  align-items: center;
  justify-content: center;
  height: ${(p) => p.height}px;
  ${(p) => p.width && `width: ${p.width}px;`}
  padding: 0 16px;
  border-radius: 50%;
  border-width: 1px;
  border-color: ${(p) => p.borderColor};
`;

export const Button: FC<ButtonProps> = (props) => {
  const theme = useTheme();
  const {
    children,
    iconName,
    label,
    labelColor = theme.colors.text,
    borderColor = theme.colors.border,
    backgroundColor = theme.colors.background,
    size = "md",
    ...rest
  } = props;
  const height = heightBySize[size];
  const fontSize = fontSizeBySize[size];
  const iconOnly = !!iconName && !label;

  return (
    <StyledTouchableOpacity
      color={backgroundColor}
      borderColor={borderColor}
      height={height}
      width={iconOnly && height}
      {...rest}
    >
      {iconName && (
        <Icon
          name={iconName}
          size={fontSize + 3}
          color={labelColor ?? theme.colors.text}
        />
      )}
      {label && (
        <Text size={fontSize} color={labelColor}>
          {label}
        </Text>
      )}
      {children}
    </StyledTouchableOpacity>
  );
};
