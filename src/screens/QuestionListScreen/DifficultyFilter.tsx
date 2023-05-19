import React, { forwardRef, useEffect, useState } from "react";
import { ModalSheet, ModalSheetProps, Space, Text } from "../../components";
import { Modalize } from "react-native-modalize";
import { styled } from "styled-components/native";
import { QuestionDifficultyFilter } from "../../core/types";

type DifficultyFilterProps = ModalSheetProps & {
  onDifficultySelected: (difficulty: QuestionDifficultyFilter) => void;
};

export const DifficultyFilter = forwardRef<Modalize, DifficultyFilterProps>(
  (props, ref) => {
    const [value, setValue] = useState<QuestionDifficultyFilter>();
    const { onDifficultySelected, ...rest } = props;

    useEffect(() => {
      onDifficultySelected(value);
    }, [value]);

    const selectDifficulty = (difficulty: QuestionDifficultyFilter) => {
      setValue(difficulty);
      // @ts-ignore
      ref.current.close();
    };
    return (
      <ModalSheet ref={ref} {...rest}>
        <Text size={17} weight={600}>
          Difficulty
        </Text>
        <Space height={16} />
        <OptionsContainer>
          <DifficultyOption
            selected={value == "EASY"}
            onPress={() => selectDifficulty("EASY")}
          >
            <Text dim={value != "EASY"}>Easy</Text>
          </DifficultyOption>
          <DifficultyOption
            selected={value == "MEDIUM"}
            onPress={() => selectDifficulty("MEDIUM")}
          >
            <Text dim={value != "MEDIUM"}>Medium</Text>
          </DifficultyOption>
          <DifficultyOption
            selected={value == "HARD"}
            onPress={() => selectDifficulty("HARD")}
          >
            <Text dim={value != "HARD"}>Hard</Text>
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
