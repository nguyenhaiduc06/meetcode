import React, { FC } from "react";
import { styled } from "styled-components/native";
import { Text } from "../../components";
import { ViewProps } from "react-native";

type SolvedProblemsChipProps = ViewProps & {
  label: string;
  count: number;
};

export const SolvedProblemsChip: FC<SolvedProblemsChipProps> = (props) => {
  const { label, count, ...rest } = props;
  return (
    <Container {...rest}>
      <Text>{label}</Text>
      <Text dim>{count}</Text>
    </Container>
  );
};

const Container = styled.View`
  background-color: ${(p) => p.theme.colors.background};
  border-radius: 50%;
  padding: 4px 12px;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  justify-content: center;
  border: 1px solid ${(p) => p.theme.colors.border};
`;
