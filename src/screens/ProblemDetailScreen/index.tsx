import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { styled } from "styled-components/native";
import { MainStackNavigatorProp, MainStackParamList } from "../../navigators";
import { leetCode } from "../../core/LeetCode";
import RenderHTML from "react-native-render-html";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { palette } from "../../theme";
import { Button, Text, Space, Chip, Icon } from "../../components";
import { useTheme } from "../../hooks";
import Helper from "../../utils/Helper";

const Container = styled.View`
  flex: 1;
`;

const ScrollViewContainer = styled.View`
  flex: 1;
  padding: 16px;
`;

const Row = styled.View<{ gap: number }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${(p) => p.gap}px;
`;

const BottomRight = styled.View`
  position: absolute;
  flex-direction: row;
  padding: 0 16px;
  gap: 16px;
  bottom: 0;
  right: 0;
  z-index: 1;
`;

export const ProblemDetailScreen = () => {
  const [problem, setProblem] = useState(null);
  const navigation = useNavigation<MainStackNavigatorProp>();
  const route = useRoute<RouteProp<MainStackParamList>>();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { titleSlug } = route.params;
  useEffect(() => {
    leetCode.getProblemDetail(titleSlug).then(setProblem);
  }, []);

  const openCodeEditor = () => {
    navigation.navigate("CodeEditor");
  };

  if (!problem) {
    return <View />;
  }

  const { difficulty, likes, dislikes } = problem;

  const baseStyle = {
    fontSize: 16,
    color: theme.colors.text,
  };

  const tagsStyles = {
    p: {
      margin: 0,
      marginTop: 4,
    },
    pre: {
      backgroundColor: theme.colors.foreground,
      borderRadius: 8,
      paddingHorizontal: 12,
    },
  };

  return (
    <Container>
      <BottomRight style={{ bottom: insets.bottom }}>
        <Button label="Solutions" iconName="key-2-line" />
        <Button
          label="Solve"
          iconName="code-s-slash-line"
          backgroundColor={theme.colors.primary}
          labelColor={palette.white}
          onPress={openCodeEditor}
        />
      </BottomRight>

      <ScrollView>
        <ScrollViewContainer>
          <Text size={24} weight={600}>
            {problem?.title}
          </Text>
          <Row gap={16} style={{ marginVertical: 8 }}>
            <Chip
              label={problem.difficulty}
              labelColor={theme.colors.success}
            />
            <Icon
              name="checkbox-circle-line"
              size={18}
              color={theme.colors.success}
            />
            <Row gap={4}>
              <Icon name="thumb-up-line" size={16} color={theme.colors.text} />
              <Text>{Helper.nFormatter(likes)}</Text>
            </Row>
            <Row gap={4}>
              <Icon
                name="thumb-down-line"
                size={16}
                color={theme.colors.text}
              />
              <Text>{Helper.nFormatter(dislikes)}</Text>
            </Row>
            <Icon name="star-line" size={16} color={theme.colors.text} />
          </Row>
          {problem && (
            <RenderHTML
              baseStyle={baseStyle}
              tagsStyles={tagsStyles}
              contentWidth={200}
              source={{
                html: problem.content,
              }}
            />
          )}

          {/* add 64 to height to avoid scroll view bottom content being covered by bottom buttons */}
          <Space height={insets.bottom + 64} />
        </ScrollViewContainer>
      </ScrollView>
    </Container>
  );
};
