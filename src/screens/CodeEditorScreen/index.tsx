import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Button,
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styled } from "styled-components/native";
import { MainStackNavigatorProp, MainStackParamList } from "../../navigators";
import { leetCode } from "../../core/LeetCode";
import RenderHTML from "react-native-render-html";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { darkTheme } from "../../theme";
import CodeEditor, {
  CodeEditorSyntaxStyles,
} from "@rivascva/react-native-code-editor";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Icon } from "../../components";
import { useTheme } from "../../hooks";
import { Header } from "./Header";

const Container = styled.View`
  flex: 1;
`;

const ScrollViewContainer = styled.View`
  flex: 1;
  padding: 16px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${(p) => p.theme.colors.text};
`;

const ToolbarContainer = styled.View`
  height: 40px;
  border-radius: 6px;
  flex-direction: row;
  align-items: center;
`;

const ToolbarButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
`;

const ToolbarText = styled.Text`
  font-size: 16px;
  font-family: "Menlo";
  color: ${(p) => p.theme.colors.text};
`;

export const CodeEditorScreen = () => {
  const [problem, setProblem] = useState(null);
  const theme = useTheme();
  const initialCode = problem
    ? problem.codeSnippets.find((snippet) => snippet.langSlug == "python").code
    : null;

  const [typedCode, setTypedCode] = useState("");
  const navigation = useNavigation<MainStackNavigatorProp>();
  const route = useRoute<RouteProp<MainStackParamList>>();
  const insets = useSafeAreaInsets();
  const { titleSlug } = route.params ?? {};
  useEffect(() => {
    leetCode.getProblemDetail(titleSlug).then(setProblem);
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <Button title="Submit" />;
      },
    });
  }, [navigation]);
  const keyboard = useAnimatedKeyboard();
  const translatedStyle = useAnimatedStyle(() => {
    return {
      width: "100%",
      borderTopColor: theme.colors.border,
      borderTopWidth: 1,
      backgroundColor: theme.colors.background,
      flexDirection: "row",
      position: "absolute",
      bottom:
        keyboard.height.value > insets.bottom
          ? keyboard.height.value
          : insets.bottom,
      left: 0,
    };
  });

  const submit = () => {
    // const { questionId } = problem;
    // leetCode.submit({
    //   slug: titleSlug,
    //   question_id: questionId,
    //   lang: "python3",
    //   typed_code: typedCode,
    // });
    Keyboard.dismiss();
  };

  const dismiss = () => {
    Keyboard.dismiss();
  };

  if (!problem) {
    return <View />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <CodeEditor
        initialValue={initialCode}
        autoFocus={false}
        style={{
          fontSize: 19,
          inputLineHeight: 26,
          highlighterLineHeight: 26,
          backgroundColor: "transparent",
        }}
        language="python"
        syntaxStyle={CodeEditorSyntaxStyles.atomOneDark}
        showLineNumbers
        onChange={setTypedCode}
      />
      <Animated.View style={translatedStyle}>
        <ScrollView
          horizontal
          keyboardDismissMode="none"
          keyboardShouldPersistTaps="always"
        >
          <ToolbarContainer>
            <ToolbarButton>
              <Icon name="arrow-right" size={16} color="white" />
            </ToolbarButton>
            <ToolbarButton>
              <Icon name="arrow-left" size={16} color="white" />
            </ToolbarButton>
            {["(", "[", "{", ":", ";", "'", '"'].map((char) => (
              <ToolbarButton
                key={char}
                onLongPress={() => {
                  console.log("opening submenu");
                }}
              >
                <ToolbarText>{char}</ToolbarText>
              </ToolbarButton>
            ))}
          </ToolbarContainer>
        </ScrollView>
        <ToolbarButton onPress={dismiss}>
          <Icon name="chevron-down" size={16} color="white" />
        </ToolbarButton>
      </Animated.View>
    </View>
  );

  return (
    <Container>
      <ScrollView>
        <ScrollViewContainer>
          <Button title="Submit" onPress={submit} />
          <Title>{problem?.title}</Title>
          {problem && (
            <RenderHTML
              contentWidth={200}
              source={{
                html: problem.content,
              }}
              tagsStyles={tagsStyles}
            />
          )}
          <View style={{ height: insets.bottom }} />
        </ScrollViewContainer>
      </ScrollView>
    </Container>
  );
};

const tagsStyles = {
  p: {
    fontSize: 16,
    color: darkTheme.colors.textDim,
  },
  pre: {
    fontSize: 16,
    color: darkTheme.colors.textDim,
  },
  ul: {
    fontSize: 16,
    color: darkTheme.colors.textDim,
  },
};
