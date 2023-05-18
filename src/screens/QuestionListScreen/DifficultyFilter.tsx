import React, { forwardRef } from "react";
import { ModalSheet, ModalSheetProps, Space, Text } from "../../components";
import { Modalize } from "react-native-modalize";
import { styled } from "styled-components/native";
import { QuestionDifficultyFilter } from "../../core/types";

type DifficultyFilterProps = ModalSheetProps & {
  onDifficultySelected: (difficulty: QuestionDifficultyFilter) => void;
};

export const DifficultyFilter = forwardRef<Modalize, DifficultyFilterProps>(
  (props, ref) => {
    const { onDifficultySelected, ...rest } = props;
    const selectDifficulty = (difficulty: QuestionDifficultyFilter) => {
      onDifficultySelected(difficulty);
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
          <DifficultyOption onPress={() => selectDifficulty("EASY")}>
            <Text>Easy</Text>
          </DifficultyOption>
          <DifficultyOption onPress={() => selectDifficulty("MEDIUM")}>
            <Text>Medium</Text>
          </DifficultyOption>
          <DifficultyOption onPress={() => selectDifficulty("HARD")}>
            <Text>Hard</Text>
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
