import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Keyboard, ScrollView, View } from "react-native";
import { styled } from "styled-components/native";
import { MainStackNavigatorProp, MainStackParamList } from "../../navigators";
import { leetCode } from "../../core/LeetCode";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { darkTheme } from "../../theme";
import CodeEditor, {
  CodeEditorSyntaxStyles,
} from "@rivascva/react-native-code-editor";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Icon, Button } from "../../components";
import { useTheme } from "../../hooks";
import { Header } from "./Header";
import { CodeSnippet, Question } from "../../core/types";

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
  const [codeSnippets, setCodeSnippets] = useState<CodeSnippet[]>([]);
  const [typedCode, setTypedCode] = useState("");
  const theme = useTheme();
  const keyboard = useAnimatedKeyboard();
  const insets = useSafeAreaInsets();
  const route = useRoute<RouteProp<MainStackParamList>>();
  const { titleSlug } = route.params ?? {};

  const codeSnippet = codeSnippets.find(
    (snippet) => snippet.langSlug == "python"
  );
  const initialCode = codeSnippet?.code ?? "";

  useEffect(() => {
    leetCode
      .getQuestionCodeEditorDetail(titleSlug)
      .then((detail) => setCodeSnippets(detail.codeSnippets));
  }, []);

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
    // const { questionId } = question;
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

  if (!initialCode) {
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
              <Icon
                name="indent-increase"
                size={16}
                color={theme.colors.text}
              />
            </ToolbarButton>
            <ToolbarButton>
              <Icon
                name="indent-decrease"
                size={16}
                color={theme.colors.text}
              />
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
          <Icon name="keyboard-box-line" size={16} color={theme.colors.text} />
        </ToolbarButton>
      </Animated.View>
    </View>
  );
};
