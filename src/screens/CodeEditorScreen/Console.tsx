import React, { FC, useState } from "react";
import { Modal, View, ScrollView } from "react-native";
import { styled } from "styled-components/native";
import { Button, Space, Text } from "../../components";
import { useTheme } from "../../hooks";
import { CodeInterpretResult } from "../../core/types";

type ConsoleProps = {
  visible: boolean;
  dismiss: () => void;
  testCases: any[];
  result: CodeInterpretResult;
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 16px;
  gap: 8px;
`;

const Card = styled.View`
  height: 400px;
  padding: 16px;
  background-color: ${(p) => p.theme.colors.background};
  border-radius: 16px;
`;

const TitleRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
`;

const StatusRow = styled.View`
  flex-direction: row;
  align-items: baseline;
  margin-bottom: 16px;
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
  border-radius: 4px;
  background-color: ${(p) => p.theme.colors.foreground};
  gap: 4px;
`;

export const Console: FC<ConsoleProps> = (props) => {
  const { visible, dismiss, testCases, result } = props;
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTestCase = testCases[currentIndex];
  const inputs = currentTestCase.split("\n");

  const { code_answer, expected_code_answer } = result ?? {};
  const renderResultStatus = () => {
    if (!result) return <View />;
    const accepted =
      result.status_code == 10 &&
      result.total_correct == result.total_testcases;
    const statusMessage = accepted ? result.status_msg : "Wrong Answer";
    return (
      <StatusRow>
        <Text
          size={17}
          weight={600}
          color={accepted ? theme.colors.success : theme.colors.failure}
        >
          {statusMessage}
        </Text>
        <Text size={13} dim>
          {result.status_runtime}
        </Text>
        <Text size={13} dim>
          {result.status_memory}
        </Text>
      </StatusRow>
    );
  };
  return (
    <Modal visible={visible} transparent animationType="fade">
      <Container>
        <TitleRow>
          <Text size={17} weight={600}>
            Console
          </Text>
          <Button iconName="close-line" size="sm" onPress={dismiss} />
        </TitleRow>
        <Card
        // onStartShouldSetResponder={(event) => true}
        // onTouchEnd={(e) => {
        //   e.stopPropagation();
        // }}
        >
          {renderResultStatus()}
          <View style={{ flex: 1 }}>
            <Row>
              {testCases.map((testCase, index) => (
                <Button
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
                <InputContainer>
                  <Text>{input}</Text>
                </InputContainer>
              ))}

              <Space height={16} />

              {!!code_answer?.length && (
                <>
                  <Text size={13} dim>
                    Output
                  </Text>
                  <InputContainer>
                    <Text>{code_answer[currentIndex]}</Text>
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
                    <Text>{expected_code_answer[currentIndex]}</Text>
                  </InputContainer>
                </>
              )}
            </ScrollView>
          </View>
        </Card>
      </Container>
    </Modal>
  );
};
