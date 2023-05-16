import React, { forwardRef, useState } from "react";
import { View, ScrollView } from "react-native";
import { styled } from "styled-components/native";
import { Button, ModalSheet, Space, Text } from "../../components";
import { useTheme } from "../../hooks";
import { CodeInterpretResult } from "../../core/types";
import { Modalize, ModalizeProps } from "react-native-modalize";

type ConsoleProps = ModalizeProps & {
  testCases: any[];
  result: CodeInterpretResult;
  pending: boolean;
};

export const Console = forwardRef<Modalize, ConsoleProps>((props, ref) => {
  const { testCases, result, pending, ...rest } = props;
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTestCase = testCases[currentIndex];
  const inputs = currentTestCase.split("\n");

  const { code_answer, expected_code_answer } = result ?? {};

  const getTitle = () => {
    if (pending)
      return {
        label: "Pending...",
        color: theme.colors.warning,
      };
    if (!result)
      return {
        label: "Console",
        color: theme.colors.text,
      };
    const accepted =
      result.status_code == 10 &&
      result.total_correct == result.total_testcases;
    return {
      label: accepted ? result.status_msg : "Wrong Answer",
      color: accepted ? theme.colors.success : theme.colors.failure,
    };
  };

  const title = getTitle();

  return (
    <ModalSheet ref={ref}>
      <TitleRow>
        <StatusRow>
          <Text size={17} weight={600} color={title.color}>
            {title.label}
          </Text>
          <Text size={13} dim>
            {result?.status_runtime}
          </Text>
          <Text size={13} dim>
            {result?.status_memory}
          </Text>
        </StatusRow>
      </TitleRow>
      <View style={{ flex: 1 }}>
        <Row>
          {testCases.map((testCase, index) => (
            <Button
              key={`btn-testcase-${index}`}
              label={`Case ${index + 1}`}
              backgroundColor={
                index == currentIndex
                  ? theme.colors.foreground
                  : theme.colors.background
              }
              borderColor={
                index == currentIndex ? "transparent" : theme.colors.border
              }
              labelColor={
                !result
                  ? undefined
                  : result.compare_result[index] == "0"
                  ? theme.colors.failure
                  : theme.colors.success
              }
              size="sm"
              onPress={() => setCurrentIndex(index)}
            />
          ))}
        </Row>
        <Space height={16} />
        <ScrollView style={{ flex: 1 }}>
          <Text size={13} dim>
            Input
          </Text>
          {inputs.map((input) => (
            <InputContainer key={input}>
              <MonoText>{input}</MonoText>
            </InputContainer>
          ))}

          <Space height={16} />

          {!!code_answer?.length && (
            <>
              <Text size={13} dim>
                Output
              </Text>
              <InputContainer>
                <MonoText>{code_answer[currentIndex]}</MonoText>
              </InputContainer>
            </>
          )}

          <Space height={16} />

          {!!expected_code_answer?.length && (
            <>
              <Text size={13} dim>
                Expected
              </Text>
              <InputContainer>
                <MonoText>{expected_code_answer[currentIndex]}</MonoText>
              </InputContainer>
            </>
          )}
        </ScrollView>
      </View>
    </ModalSheet>
  );
});

const TitleRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const StatusRow = styled.View`
  flex-direction: row;
  align-items: baseline;
  gap: 8px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

const InputContainer = styled.View`
  padding: 12px;
  margin-top: 8px;
  border-radius: 8px;
  background-color: ${(p) => p.theme.colors.foreground};
  gap: 4px;
`;

const MonoText = styled(Text)`
  font-family: "IBMPlexMono_400Regular";
`;
