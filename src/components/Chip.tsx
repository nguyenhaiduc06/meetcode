import { FC } from "react";
import { ViewProps } from "react-native";
import { styled } from "styled-components/native";

type ChipProps = ViewProps & {
  backgroundColor?: string;
  label: string;
  labelColor?: string;
};

const Container = styled.View<{ backgroundColor?: string }>`
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor ?? theme.colors.foreground};
  border-radius: 50%;
  padding: 3px 8px;
  align-items: center;
  justify-content: center;
`;

const Label = styled.Text<{ color?: string }>`
  font-size: 13px;
  color: ${({ color, theme }) => color ?? theme.colors.textDim};
`;

export const Chip: FC<ChipProps> = ({ label, labelColor, ...rest }) => {
  return (
    <Container {...rest}>
      <Label color={labelColor}>{label}</Label>
    </Container>
  );
};
