import React, { forwardRef, useEffect, useState } from "react";
import { ModalSheet, ModalSheetProps, Space, Text } from "../../components";
import { Modalize } from "react-native-modalize";
import { styled } from "styled-components/native";
import { QuestionStatusFilter } from "../../core/types";

type StatusFilterProps = ModalSheetProps & {
  onStatusSelected: (status: QuestionStatusFilter) => void;
};

export const StatusFilter = forwardRef<Modalize, StatusFilterProps>(
  (props, ref) => {
    const [value, setValue] = useState<QuestionStatusFilter>();
    const { onStatusSelected, ...rest } = props;

    useEffect(() => {
      onStatusSelected(value);
    }, [value]);

    const selectStatus = (status: QuestionStatusFilter) => {
      setValue(status);
      // @ts-ignore
      ref.current.close();
    };
    return (
      <ModalSheet ref={ref} {...rest}>
        <Text size={17} weight={600}>
          Status
        </Text>
        <Space height={16} />
        <OptionsContainer>
          <DifficultyOption
            selected={value == "NOT_STARTED"}
            onPress={() => selectStatus("NOT_STARTED")}
          >
            <Text dim={value != "NOT_STARTED"}>Todo</Text>
          </DifficultyOption>
          <DifficultyOption
            selected={value == "AC"}
            onPress={() => selectStatus("AC")}
          >
            <Text dim={value != "AC"}>Solved</Text>
          </DifficultyOption>
          <DifficultyOption
            selected={value == "TRIED"}
            onPress={() => selectStatus("TRIED")}
          >
            <Text dim={value != "TRIED"}>Attempted</Text>
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
  border: 1px solid
    ${({ selected, theme }) =>
      selected ? theme.colors.text : theme.colors.foreground};
`;
