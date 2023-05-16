import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { styled } from "styled-components/native";
import { MainStackNavigatorProp, MainStackParamList } from "../../navigators";
import { leetCode } from "../../core/LeetCode";
import RenderHTML, { defaultSystemFonts } from "react-native-render-html";
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

export const QuestionDetailScreen = () => {
  const navigation = useNavigation<MainStackNavigatorProp>();
  const route = useRoute<RouteProp<MainStackParamList, "QuestionDetail">>();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [content, setContent] = useState(null);
  const { question } = route.params;
  const {
    title,
    titleSlug,
    difficulty,
    isLiked,
    likes,
    dislikes,
    status,
    topicTags,
    acRate,
  } = question;

  useEffect(() => {
    leetCode.getQuestionContent(titleSlug).then(setContent);
  }, []);

  const openCodeEditor = () => {
    navigation.navigate("CodeEditor", {
      titleSlug: question.titleSlug,
    });
  };

  const statusIconName =
    status == "ac"
      ? "checkbox-circle-line"
      : status == "notac"
      ? "indeterminate-circle-line"
      : "checkbox-blank-circle-line";
  const statusIconColor =
    status == "ac"
      ? theme.colors.success
      : status == "notac"
      ? theme.colors.warning
      : theme.colors.textDim;

  const difficultyLabelColor = Helper.getColorByDifficulty(difficulty);

  const systemFonts = [...defaultSystemFonts, "IBMPlexMono_400Regular"];

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
      borderRadius: 4,
      paddingHorizontal: 12,
      fontFamily: "IBMPlexMono_400Regular",
    },
    code: {
      fontFamily: "IBMPlexMono_400Regular",
    },
  };

  return (
    <Container>
      <BottomRight style={{ bottom: insets.bottom }}>
        <Button label="Hints" iconName="key-2-line" />
        <Button
          label="Solve"
          iconName="code-s-slash-line"
          backgroundColor={theme.colors.primary}
          labelColor={palette.white[100]}
          onPress={openCodeEditor}
        />
      </BottomRight>

      <ScrollView>
        <ScrollViewContainer>
          <Row gap={8}>
            <Icon name={statusIconName} size={20} color={statusIconColor} />
            <Text size={24} weight={600} numberOfLines={1} style={{ flex: 1 }}>
              {title}
            </Text>
          </Row>

          <Space height={8} />

          <Row gap={8}>
            <Chip label={difficulty} labelColor={difficultyLabelColor} />
            {topicTags.map((tag) => (
              <Chip
                key={`tag-${tag.name}`}
                label={tag.name}
                labelColor={theme.colors.textDim}
              />
            ))}
          </Row>

          <Space height={12} />

          <Row gap={8}>
            <Row gap={4}>
              <Text dim>Acceptance: </Text>
              <Text>{acRate.toFixed(1)}%</Text>
            </Row>
            <Row gap={4}>
              <Icon
                name="thumb-up-line"
                size={14}
                color={theme.colors.textDim}
              />
              <Text>{Helper.nFormatter(likes)}</Text>
            </Row>
            <Row gap={4}>
              <Icon
                name="thumb-down-line"
                size={14}
                color={theme.colors.textDim}
              />
              <Text>{Helper.nFormatter(dislikes)}</Text>
            </Row>
          </Row>

          <Space height={12} />

          {content && (
            <RenderHTML
              baseStyle={baseStyle}
              tagsStyles={tagsStyles}
              contentWidth={200}
              systemFonts={systemFonts}
              enableCSSInlineProcessing={false}
              source={{
                html: content,
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
