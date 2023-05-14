import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Keyboard, ScrollView, View } from "react-native";
import { styled } from "styled-components/native";
import { MainStackParamList } from "../../navigators";
import { leetCode } from "../../core/LeetCode";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CodeEditor, {
  CodeEditorSyntaxStyles,
} from "@rivascva/react-native-code-editor";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Button, Icon } from "../../components";
import { useTheme } from "../../hooks";
import { Header } from "./Header";
import { Console } from "./Console";
import { CodeInterpretResult, CodeEditorData } from "../../core/types";

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
  const [codeEditorData, setCodeEditorData] = useState<CodeEditorData>(null);
  const [codeInterpretResult, setCodeInterpretResult] =
    useState<CodeInterpretResult>(null);
  console.log("🚀 ~ codeInterpretResult:", codeInterpretResult);
  const [codeSubmitResult, setCodeSubmitResult] = useState(null);

  const [typedCode, setTypedCode] = useState("");

  const [showConsole, setShowConsole] = useState<boolean>(false);

  const theme = useTheme();
  const keyboard = useAnimatedKeyboard();
  const insets = useSafeAreaInsets();
  const route = useRoute<RouteProp<MainStackParamList>>();
  const { titleSlug } = route.params;
  const translatedStyle = useAnimatedStyle(() => {
    return {
      width: "100%",
      paddingVertical: 8,
      paddingRight: 8,
      backgroundColor: theme.colors.background,
      flexDirection: "row",
      alignItems: "center",
      position: "absolute",
      bottom:
        keyboard.height.value > insets.bottom
          ? keyboard.height.value
          : insets.bottom,
      left: 0,
    };
  });

  useEffect(() => {
    leetCode.getQuestionCodeEditor(titleSlug).then(setCodeEditorData);
  }, []);

  if (!codeEditorData) {
    return <View />;
  }

  const { exampleTestcaseList, codeSnippets } = codeEditorData;
  const codeSnippet = codeSnippets.find(
    (snippet) => snippet.langSlug == "python"
  );
  const initialCode = codeSnippet?.code ?? "";

  const run = () => {
    setShowConsole(true);
    const { questionId, exampleTestcaseList } = codeEditorData;
    leetCode
      .getCodeInterpretResult({
        titleSlug,
        data_input: exampleTestcaseList.join("\n"),
        question_id: questionId,
        lang: "python3",
        typed_code: typedCode,
      })
      .then(setCodeInterpretResult);
  };

  const submit = () => {
    const { questionId } = codeEditorData;
    leetCode.submitCode({
      titleSlug,
      question_id: questionId,
      lang: "python3",
      typed_code: typedCode,
    });
    Keyboard.dismiss();
  };

  const dismiss = () => {
    Keyboard.dismiss();
  };

  const toggleConsole = () => {
    setShowConsole((show) => !show);
  };

  if (!initialCode) {
    return <View />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Header onSubmit={submit} onRun={run} />
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
        <View
          style={{
            borderRightWidth: 1,
            borderRightColor: theme.colors.border,
            height: 20,
          }}
        />
        <ToolbarButton onPress={dismiss}>
          <Icon name="keyboard-box-line" size={16} color={theme.colors.text} />
        </ToolbarButton>
        <Button
          iconName="terminal-box-line"
          label="Console"
          size="sm"
          onPress={toggleConsole}
        />
      </Animated.View>
      <Console
        visible={showConsole}
        dismiss={() => setShowConsole(false)}
        testCases={exampleTestcaseList}
        result={codeInterpretResult}
      />
    </View>
  );
};
