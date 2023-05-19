import React, { FC, useEffect, useRef, useState } from "react";
import { styled } from "styled-components/native";
import { ScrollView } from "react-native";
import { Button } from "../../components";
import { QuestionListFilterInput } from "../../core/types";
import { DifficultyFilter } from "./DifficultyFilter";
import { StatusFilter } from "./StatusFilter";
import Helper from "../../utils/Helper";

type FiltersProps = {
  onFiltersChanged: (newFilter: QuestionListFilterInput) => void;
};

export const Filters: FC<FiltersProps> = (props) => {
  const { onFiltersChanged } = props;
  const [filters, setFilters] = useState<QuestionListFilterInput>({});
  const { difficulty, status } = filters;
  const difficultyLabel =
    Helper.getDifficultyLabelByValue(difficulty) ?? "Difficulty";
  const statusLabel = Helper.getStatusLabelByValue(status) ?? "Status";

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
