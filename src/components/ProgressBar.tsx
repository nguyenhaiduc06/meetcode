import React, { FC } from "react";
import { styled } from "styled-components/native";
import { useTheme } from "../hooks";
import { ViewProps } from "react-native";

type ProgressBarProps = ViewProps & {
  progress: number;
  progressColor?: string;
  backgroundColor?: string;
};

export const ProgressBar: FC<ProgressBarProps> = (props) => {
  const theme = useTheme();
  const {
    progress,
    progressColor = theme.colors.text,
    backgroundColor = theme.colors.textDim,
    ...rest
  } = props;
  return (
    <Container color={backgroundColor} {...rest}>
      <Progress widthPercent={progress} color={progressColor} />
    </Container>
  );
};

const Container = styled.View<{ color: string }>`
  width: 100%;
  height: 8px;
  border-radius: 100%;
  background-color: ${(p) => p.color};
  overflow: hidden;
`;

const Progress = styled.View<{ widthPercent: number; color: string }>`
  height: 8px;
  width: ${(p) => p.widthPercent}%;
  background-color: ${(p) => p.color};
  border-radius: 100%;
`;
