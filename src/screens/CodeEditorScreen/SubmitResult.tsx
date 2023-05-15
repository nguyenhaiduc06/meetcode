import React, { forwardRef } from "react";
import { View, ScrollView } from "react-native";
import { styled } from "styled-components/native";
import { Button, Space, Text } from "../../components";
import { useTheme } from "../../hooks";
import { CodeSubmitResult } from "../../core/types";
import { Modalize, ModalizeProps } from "react-native-modalize";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type SubmitResultProps = ModalizeProps & {
  result: CodeSubmitResult;
  pending: boolean;
};

export const SubmitResult = forwardRef<Modalize, SubmitResultProps>(
  (props, ref) => {
    const { result, pending, ...rest } = props;
    const theme = useTheme();
    const insets = useSafeAreaInsets();

    const {
      status_code,
      status_msg,
      status_runtime,
      status_memory,
      runtime_percentile,
      memory_percentile,
      total_correct,
      total_testcases,
      code_output,
      expected_output,
      last_testcase,
      full_runtime_error,
    } = result ?? {};

    const accepted =
      result && status_code == 10 && total_correct == total_testcases;

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
      return {
        label: result.status_msg,
        color: accepted ? theme.colors.success : theme.colors.failure,
      };
    };

    const renderErrorDetail = () => {
      if (status_code != 15) return <View />;
      return (
        <InputContainer>
          <MonoText color={theme.colors.failure}>{full_runtime_error}</MonoText>
        </InputContainer>
      );
    };

    const renderFailDetail = () => {
      if (!result || status_code != 11) return <View />;
      return (
        <>
          <Text size={13} dim>
            Last testcase
          </Text>
          {last_testcase.split("\\n").map((input) => (
            <InputContainer>
              <MonoText>{input}</MonoText>
            </InputContainer>
          ))}

          <Space height={16} />

          <Text size={13} dim>
            Output
          </Text>
          <InputContainer>
            <MonoText>{code_output}</MonoText>
          </InputContainer>

          <Space height={16} />

          <Text size={13} dim>
            Expected
          </Text>
          <InputContainer>
            <MonoText>{expected_output}</MonoText>
          </InputContainer>
        </>
      );
    };

    const renderMetrics = () => {
      if (!result || status_code != 10) return <View />;
      return (
        <Row>
          <Metric>
            <Text size={13} dim>
              Runtime
            </Text>
            <Text size={17} weight={600}>
              {status_runtime}
            </Text>
            <Space height={12} />
            <Text size={13} dim>
              Beats
            </Text>
            <Text size={17} weight={600}>
              {runtime_percentile?.toFixed(1)}%
            </Text>
          </Metric>
          <Metric>
            <Text size={13} dim>
              Memory
            </Text>
            <Text size={17} weight={600}>
              {status_memory}
            </Text>
            <Space height={8} />
            <Text size={13} dim>
              Beats
            </Text>
            <Text size={17} weight={600}>
              {memory_percentile?.toFixed(1)}%
            </Text>
          </Metric>
        </Row>
      );
    };

    const title = getTitle();

    return (
      <Modalize
        adjustToContentHeight
        ref={ref}
        modalStyle={{ backgroundColor: "transparent" }}
        withHandle={false}
        withReactModal
        {...rest}
      >
        <Card>
          <TitleRow>
            <StatusRow>
              <Text size={17} weight={600} color={title.color}>
                {title.label}
              </Text>
            </StatusRow>
          </TitleRow>
          <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
              {renderMetrics()}
              {renderErrorDetail()}
              {renderFailDetail()}
            </ScrollView>
          </View>
        </Card>
        <Space height={insets.bottom} />
      </Modalize>
    );
  }
);

const Card = styled.View`
  height: 400px;
  padding: 16px;
  background-color: ${(p) => p.theme.colors.background};
  border-radius: 16px;
  margin: 16px;
  border: 1px solid ${(p) => p.theme.colors.border};
`;

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

const Metric = styled.View`
  background-color: ${(p) => p.theme.colors.foreground};
  flex: 1;
  padding: 16px;
  border-radius: 8px;
`;

const InputContainer = styled.View`
  padding: 12px;
  margin-top: 8px;
  border-radius: 4px;
  background-color: ${(p) => p.theme.colors.foreground};
  gap: 4px;
`;

const MonoText = styled(Text)`
  font-family: "IBMPlexMono_400Regular";
`;
