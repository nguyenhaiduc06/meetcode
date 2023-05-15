import React from "react";
import { styled } from "styled-components/native";
import { Text } from "./Text";

const Container = styled.View`
  flex-direction: row;
  align-items: flex-start;
  padding: 8px;
  width: 200px;
  gap: 8px;
  border-radius: 8px;
  background-color: ${(p) => p.theme.colors.foreground};
`;

const Cover = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 4px;
`;

export const StudyPlanItem = (props) => {
  const { cover, name } = props;
  return (
    <Container>
      <Cover source={{ uri: cover }} />
      <Text size={15} weight={600} style={{ flex: 1 }}>
        {name}
      </Text>
    </Container>
  );
};
