import React, { FC, useEffect, useRef, useState } from "react";
import { styled } from "styled-components/native";
import { ScrollView } from "react-native";
import { Button, Text } from "../../components";
import {
  QuestionDifficultyFilter,
  QuestionListFilterInput,
  QuestionStatusFilter,
} from "../../core/types";
import { DifficultyFilter } from "./DifficultyFilter";
import { StatusFilter } from "./StatusFilter";

const difficultyLabelByValue: { [key in QuestionDifficultyFilter]: string } = {
  EASY: "Easy",
  MEDIUM: "Medium",
  HARD: "Hard",
};

const statusLabelByValue: { [key in QuestionStatusFilter]: string } = {
  AC: "Solved",
  TRIED: "Attempted",
  NOT_STARTED: "Todo",
};

type FiltersProps = {
  onFiltersChanged: (newFilter: QuestionListFilterInput) => void;
};

export const Filters: FC<FiltersProps> = (props) => {
  const { onFiltersChanged } = props;
  const [filters, setFilters] = useState<QuestionListFilterInput>({});
  const { difficulty, status } = filters;
  const difficultyLabel = difficulty
    ? difficultyLabelByValue[difficulty]
    : "Difficulty";
  const statusLabel = status ? statusLabelByValue[status] : "Status";

  useEffect(() => {
    onFiltersChanged(filters);
  }, [filters]);

  const difficultyFilter = useRef(null);
  const statusFilter = useRef(null);

  const handleDifficultySelected = (difficulty) => {
    setFilters((filters) => ({ ...filters, difficulty }));
  };

  const handleStatusSelected = (status) => {
    setFilters((filters) => ({ ...filters, status }));
  };
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ flexGrow: 0 }}
    >
      <FiltersContainer>
        <Button
          size="sm"
          label={difficultyLabel}
          onPress={difficultyFilter.current?.open}
        />
        <Button
          size="sm"
          label={statusLabel}
          onPress={statusFilter.current?.open}
        />
        {/* <Button size="sm">
          <Text size={13} dim>
            {filters.tags?.length ?? 0}
          </Text>
          <Text size={13}>Tags</Text>
        </Button> */}
      </FiltersContainer>

      <DifficultyFilter
        ref={difficultyFilter}
        onDifficultySelected={handleDifficultySelected}
      />
      <StatusFilter
        ref={statusFilter}
        onStatusSelected={handleStatusSelected}
      />
    </ScrollView>
  );
};

const FiltersContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  gap: 8px;
`;
