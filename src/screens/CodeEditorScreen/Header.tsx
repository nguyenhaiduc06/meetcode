import React from "react";
import { styled } from "styled-components/native";
import { Icon } from "../../components";
import { spacing } from "../../theme";
import { useTheme } from "../../hooks";

const Container = styled.View`
  padding: 12px;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

const IconButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background-color: ${(p) => p.theme.colors.foreground};
`;

const LanguageButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: ${spacing.xs}px;
`;

const SubmitButton = styled.TouchableOpacity`
  height: 32px;
  border-radius: 50%;
  padding: 0 16px;
  align-items: center;
  justify-content: center;
  background-color: ${(p) => p.theme.colors.primary};
`;

const Space = styled.View`
  flex: 1;
`;

const Text = styled.Text`
  font-size: 15px;
  color: ${(p) => p.theme.colors.text};
`;

export const Header = () => {
  const theme = useTheme();
  return (
    <Container>
      <IconButton>
        <Icon name="x" size={12} color={theme.colors.text} />
      </IconButton>
      <LanguageButton>
        <Text>Python</Text>
        <Icon name="chevron-down" size={16} color={theme.colors.text} />
      </LanguageButton>

      <Space />

      {/* add padding left to make the play button center "visually" */}
      <IconButton style={{ paddingLeft: 3 }}>
        <Icon name="play" size={12} color={theme.colors.text} />
      </IconButton>
      <SubmitButton>
        <Text>Submit</Text>
      </SubmitButton>
    </Container>
  );
};
