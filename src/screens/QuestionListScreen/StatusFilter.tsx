import React, { forwardRef } from "react";
import { ModalSheet, ModalSheetProps, Space, Text } from "../../components";
import { Modalize } from "react-native-modalize";
import { styled } from "styled-components/native";
import { QuestionStatusFilter } from "../../core/types";

type StatusFilterProps = ModalSheetProps & {
  onStatusSelected: (status: QuestionStatusFilter) => void;
};

export const StatusFilter = forwardRef<Modalize, StatusFilterProps>(
  (props, ref) => {
    const { onStatusSelected, ...rest } = props;
    const selectStatus = (status: QuestionStatusFilter) => {
      // @ts-ignore
      ref.current.close();
      onStatusSelected(status);
    };
    return (
      <ModalSheet ref={ref} {...rest}>
        <Text size={17} weight={600}>
          Status
        </Text>
        <Space height={16} />
        <OptionsContainer>
          <DifficultyOption onPress={() => selectStatus("NOT_STARTED")}>
            <Text>Todo</Text>
          </DifficultyOption>
          <DifficultyOption onPress={() => selectStatus("AC")}>
            <Text>Solved</Text>
          </DifficultyOption>
          <DifficultyOption onPress={() => selectStatus("TRIED")}>
            <Text>Attempted</Text>
          </DifficultyOption>
        </OptionsContainer>
      </ModalSheet>
    );
  }
);

const OptionsContainer = styled.View`
  gap: 8px;
`;

const DifficultyOption = styled.TouchableOpacity<{ selected?: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-radius: 8px;
  background-color: ${(p) => p.theme.colors.foreground};
`;
