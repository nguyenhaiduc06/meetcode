import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Button, ScrollView, View } from "react-native";
import { styled } from "styled-components/native";
import { MainStackParamList } from "../navigators";
import { leetCode } from "../core/LeetCode";
import RenderHTML from "react-native-render-html";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { darkTheme } from "../theme";
import CodeEditor, {
  CodeEditorSyntaxStyles,
} from "@rivascva/react-native-code-editor";

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

export const ProblemDetailScreen = () => {
  const [problem, setProblem] = useState(null);
  const initialCode = problem
    ? problem.codeSnippets.find((snippet) => snippet.langSlug == "python").code
    : null;

  const [typedCode, setTypedCode] = useState("");
  const route = useRoute<RouteProp<MainStackParamList>>();
  const insets = useSafeAreaInsets();
  const { titleSlug } = route.params;
  useEffect(() => {
    leetCode.getProblemDetail(titleSlug).then(setProblem);
  }, []);

  const submit = () => {
    const { questionId } = problem;
    leetCode.submit({
      slug: titleSlug,
      question_id: questionId,
      lang: "python3",
      typed_code: typedCode,
    });
  };

  if (!problem) {
    return <View />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Button title="Submit" onPress={submit} />
      <CodeEditor
        initialValue={initialCode}
        style={{
          fontSize: 16,
          inputLineHeight: 24,
          highlighterLineHeight: 24,
        }}
        language="python"
        syntaxStyle={CodeEditorSyntaxStyles.nord}
        showLineNumbers
        onChange={setTypedCode}
      />
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
