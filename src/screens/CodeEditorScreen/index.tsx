import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Keyboard, ScrollView, TextInput, View } from "react-native";
import { styled } from "styled-components/native";
import { MainStackNavigatorProp, MainStackParamList } from "../../navigators";
import { leetCode } from "../../core/LeetCode";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Button, Icon, Text } from "../../components";
import { useTheme } from "../../hooks";
import { Header } from "./Header";
import { Console } from "./Console";
import {
  CodeInterpretResult,
  CodeEditorData,
  CodeSubmitResult,
} from "../../core/types";
import { Modalize } from "react-native-modalize";
import { SubmitResult } from "./SubmitResult";
import { SelectCodeSnippet } from "./SelectCodeSnippet";

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  z-index: 2;
`;

const ToolbarContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ToolbarButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
`;

const MonoText = styled(Text)`
  font-size: 17px;
  font-family: "IBMPlexMono_400Regular";
`;

export const CodeEditorScreen = () => {
  const [codeEditorData, setCodeEditorData] = useState<CodeEditorData>(null);
  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0);
  const [typedCode, setTypedCode] = useState("");

  const [codeInterpretResult, setCodeInterpretResult] =
    useState<CodeInterpretResult>(null);
  const [codeInterpretPending, setCodeInterpretPending] = useState(false);

  const [codeSubmitResult, setCodeSubmitResult] =
    useState<CodeSubmitResult>(null);
  const [codeSubmitPending, setCodeSubmitPending] = useState(false);

  const consoleModal = useRef<Modalize>(null);
  const submitResultModal = useRef<Modalize>(null);
  const selectSnippetModal = useRef<Modalize>(null);

  const theme = useTheme();
  const navigation = useNavigation<MainStackNavigatorProp>();
  const keyboard = useAnimatedKeyboard();
  const insets = useSafeAreaInsets();
  const route = useRoute<RouteProp<MainStackParamList, "CodeEditor">>();
  const { titleSlug } = route.params;
  const translatedStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      bottom:
        keyboard.height.value > insets.bottom
          ? keyboard.height.value
          : insets.bottom,
      left: 0,
      width: "100%",
      paddingVertical: 8,
      backgroundColor: theme.colors.background,
    };
  });

  useEffect(() => {
    leetCode.getQuestionCodeEditor(titleSlug).then(setCodeEditorData);
  }, []);

  if (!codeEditorData) {
    return <View />;
  }

  const { exampleTestcaseList, codeSnippets } = codeEditorData;
  const selectedSnippet = codeSnippets.length
    ? codeSnippets[currentSnippetIndex]
    : null;
  const initialCode = selectedSnippet?.code ?? "";

  const run = () => {
    Keyboard.dismiss();
    openModal(consoleModal);
    setCodeInterpretPending(true);
    setCodeInterpretResult(null);
    const { questionId, exampleTestcaseList } = codeEditorData;
    leetCode
      .getCodeInterpretResult({
        titleSlug,
        data_input: exampleTestcaseList.join("\n"),
        question_id: questionId,
        lang: selectedSnippet.langSlug,
        typed_code: typedCode,
      })
      .then(setCodeInterpretResult)
      .finally(() => setCodeInterpretPending(false));
  };

  const submit = () => {
    Keyboard.dismiss();
    openModal(submitResultModal);
    setCodeSubmitPending(true);
    setCodeSubmitResult(null);
    const { questionId } = codeEditorData;
    leetCode
      .getCodeSubmitResult({
        titleSlug,
        question_id: questionId,
        lang: "python3",
        typed_code: typedCode,
      })
      .then(setCodeSubmitResult)
      .finally(() => setCodeSubmitPending(false));
  };

  const openModal = (modalRef) => {
    modalRef.current?.open();
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        selectedLanguage={selectedSnippet?.lang}
        onSubmit={submit}
        onRun={run}
        openSelectSnippet={() => openModal(selectSnippetModal)}
      />

      <TextInput
        defaultValue={initialCode}
        style={{
          flex: 1,
          color: theme.colors.text,
          paddingHorizontal: 16,
          fontSize: 16,
          fontFamily: "IBMPlexMono_400Regular",
        }}
        multiline
        onChangeText={setTypedCode}
        textAlignVertical="top"
        onScroll={() => console.log("scrolling")}
      />

      <Animated.View style={translatedStyle}>
        <Button
          iconName="terminal-box-line"
          label="Console"
          size="sm"
          onPress={() => openModal(consoleModal)}
          style={{ alignSelf: "flex-start", margin: 8 }}
        />
        <Row>
          <ScrollView
            horizontal
            keyboardDismissMode="none"
            keyboardShouldPersistTaps="always"
          >
            <ToolbarContainer>
              <ToolbarButton>
                <Icon
                  name="indent-decrease"
                  size={16}
                  color={theme.colors.text}
                />
              </ToolbarButton>
              <ToolbarButton>
                <Icon
                  name="indent-increase"
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
                  <MonoText>{char}</MonoText>
                </ToolbarButton>
              ))}
            </ToolbarContainer>
          </ScrollView>
          <View
            style={{
              borderRightWidth: 1,
              borderRightColor: theme.colors.border,
              height: 24,
            }}
          />
          <ToolbarButton onPress={Keyboard.dismiss}>
            <Icon
              name="keyboard-box-line"
              size={16}
              color={theme.colors.text}
            />
          </ToolbarButton>
        </Row>
      </Animated.View>

      <Console
        ref={consoleModal}
        pending={codeInterpretPending}
        result={codeInterpretResult}
        testCases={exampleTestcaseList}
      />

      <SubmitResult
        ref={submitResultModal}
        pending={codeSubmitPending}
        result={codeSubmitResult}
      />

      <SelectCodeSnippet
        ref={selectSnippetModal}
        codeSnippets={codeSnippets}
        selectedIndex={currentSnippetIndex}
        onSnippetSelected={setCurrentSnippetIndex}
      />
    </View>
  );
};
