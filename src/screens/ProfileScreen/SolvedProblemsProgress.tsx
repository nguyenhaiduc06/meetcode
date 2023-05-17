import React, { FC } from "react";
import { styled } from "styled-components/native";
import { Text, ProgressBar, Space } from "../../components";
import { palette } from "../../theme";

const colorByDifficulty = {
  easy: {
    progress: palette.green[500],
    background: "rgba(34, 197, 94, 0.1)",
  },
  medium: {
    progress: palette.amber[500],
    background: "rgba(245, 158, 11, 0.1)",
  },
  hard: {
    progress: palette.red[500],
    background: "rgba(239, 68, 68, 0.1)",
  },
};

type SolvedProblemsProgressProps = {
  difficulty: "Easy" | "Medium" | "Hard";
  solved: number;
  total: number;
};

export const SolvedProblemsProgress: FC<SolvedProblemsProgressProps> = (
  props
) => {
  const { difficulty, solved, total } = props;
  const progress = solved && total ? Math.round((solved / total) * 100) : 0;
  const color = colorByDifficulty[difficulty.toLowerCase()];
  return (
    <>
      <Row>
        <Text dim>{difficulty}</Text>
        <Text weight={600}>
          {solved ?? "--"}
          <Text dim>/{total ?? "--"}</Text>
        </Text>
      </Row>

      <Space height={4} />

      <ProgressBar
        progress={progress}
        progressColor={color.progress}
        backgroundColor={color.background}
      />
    </>
  );
};

const Row = styled.View`
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
`;
