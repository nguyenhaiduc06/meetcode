import React from "react";
import { styled } from "styled-components/native";
import { Button, Text, Icon, Space } from "../../components";
import { palette, spacing } from "../../theme";
import { useTheme } from "../../hooks";
import { useNavigation } from "@react-navigation/native";
import { MainStackNavigatorProp } from "../../navigators";

const Container = styled.View`
  padding: 12px;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

const LanguageButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: ${spacing.xs}px;
`;

export const Header = () => {
  const theme = useTheme();
  const navigation = useNavigation<MainStackNavigatorProp>();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <Button iconName="close-line" size="sm" onPress={goBack} />

      <Button size="sm" backgroundColor="transparent">
        <Text>Python</Text>
        <Icon name="arrow-down-s-fill" size={16} color={theme.colors.text} />
      </Button>

      <Space />

      <Button iconName="play-fill" size="sm" />
      <Button
        label="Submit"
        size="sm"
        backgroundColor={theme.colors.primary}
        labelColor={palette.white}
      />
    </Container>
  );
};
