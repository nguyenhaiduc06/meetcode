import React, { FC } from "react";
import { styled } from "styled-components/native";
import { Icon } from "./Icon";
import { Text } from "./Text";
import { useTheme } from "../hooks";
import { ViewProps } from "react-native";

type EmptyStateProps = ViewProps & {
  label: string;
  iconName: string;
};

export const EmptyState: FC<EmptyStateProps> = (props) => {
  const theme = useTheme();
  const { label, iconName, ...rest } = props;
  return (
    <Container {...rest}>
      <Icon name={iconName} size={32} color={theme.colors.textDim} />
      <Text dim>{label}</Text>
    </Container>
  );
};

const Container = styled.View`
  align-items: center;
  justify-content: center;
  gap: 8px;
`;
