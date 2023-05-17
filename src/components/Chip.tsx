import { FC } from "react";
import { ViewProps } from "react-native";
import { styled } from "styled-components/native";
import { useTheme } from "../hooks";

type ChipProps = ViewProps & {
  backgroundColor?: string;
  label: string;
  labelColor?: string;
  borderColor?: string;
};

const Container = styled.View<{ backgroundColor: string; borderColor: string }>`
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor ?? theme.colors.foreground};
  border-radius: 50%;
  height: 22px;
  padding: 0px 8px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${(p) => p.borderColor};
`;

const Label = styled.Text<{ color?: string }>`
  font-size: 13px;
  color: ${({ color, theme }) => color ?? theme.colors.text};
`;

export const Chip: FC<ChipProps> = (props) => {
  const theme = useTheme();
  const {
    label,
    labelColor = theme.colors.text,
    backgroundColor = theme.colors.foreground,
    borderColor = theme.colors.foreground,
    ...rest
  } = props;
  return (
    <Container
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      {...rest}
    >
      <Label color={labelColor}>{label}</Label>
    </Container>
  );
};
