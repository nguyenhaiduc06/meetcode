import React, { FC } from "react";
import { type TextProps as RNTextProps } from "react-native";
import { styled } from "styled-components/native";
import { useTheme } from "../hooks";

type TextProps = RNTextProps & {
  color?: string;
  size?: number;
  weight?: number;
  dim?: boolean;
};

const StyledText = styled.Text<{ color: string; size: number; weight: number }>`
  font-size: ${(p) => p.size}px;
  color: ${(p) => p.color};
  font-weight: ${(p) => p.weight};
`;

export const Text: FC<TextProps> = (props) => {
  const theme = useTheme();
  const {
    children,
    color = theme.colors.text,
    size = 15,
    dim,
    weight = 400,
    ...rest
  } = props;
  return (
    <StyledText
      color={dim ? theme.colors.textDim : color}
      size={size}
      weight={weight}
      {...rest}
    >
      {children}
    </StyledText>
  );
};
