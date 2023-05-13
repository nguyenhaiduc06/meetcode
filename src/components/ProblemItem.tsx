import { FC } from "react";
import { TouchableOpacityProps } from "react-native/types";
import { styled } from "styled-components/native";
import { useTheme } from "../hooks";
import { Chip } from "./Chip";
import { Icon } from "./Icon";
import Helper from "../utils/Helper";
import { palette, spacing } from "../theme";

type ProblemItemProps = TouchableOpacityProps & {
  title: string;
  difficulty: string;
  likes: number;
  dislikes: number;
  acRate: number;
  topicTags: any[];
};

const Container = styled.TouchableOpacity`
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${(p) => p.theme.colors.foreground};
  align-items: start;
`;

const Row = styled.View<{ gap: number }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${(p) => p.gap}px;
`;

const Title = styled.Text`
  font-size: 17px;
  color: ${(p) => p.theme.colors.text};
  font-weight: 600;
  margin-bottom: 4px;
`;

const Subtitle = styled.Text<{ dim?: boolean }>`
  font-size: 15px;
  color: ${({ dim, theme }) =>
    dim ? theme.colors.textDim : theme.colors.text};
`;

export const ProblemItem: FC<ProblemItemProps> = ({
  onPress,
  difficulty,
  title,
  likes,
  dislikes,
  acRate,
  topicTags,
}) => {
  const theme = useTheme();

  const difficultyColorName = Helper.getColorNameByDifficulty(difficulty);
  const difficultyLabelColor = palette[difficultyColorName + "700"];
  const difficultyBackgroundColor = palette[difficultyColorName + "100"];

  return (
    <Container onPress={onPress}>
      <Title>{title}</Title>
      <Row gap={spacing.s}>
        <Chip
          label={difficulty}
          labelColor={difficultyLabelColor}
          backgroundColor={difficultyBackgroundColor}
        />
        {topicTags.map((tag) => (
          <Chip
            key={tag.name}
            label={tag.name}
            labelColor={theme.colors.textDim}
          />
        ))}
      </Row>
      <Row style={{ marginTop: 12 }} gap={spacing.l}>
        <Row gap={spacing.xxs}>
          <Subtitle dim>Acceptance: </Subtitle>
          <Subtitle>{acRate.toFixed(1)}%</Subtitle>
        </Row>
        <Row gap={spacing.xxs}>
          <Icon name="thumbs-up" size={14} color={theme.colors.textDim} />
          <Subtitle>{Helper.nFormatter(likes)}</Subtitle>
        </Row>
        <Row gap={spacing.xxs}>
          <Icon name="thumbs-down" size={14} color={theme.colors.textDim} />
          <Subtitle>{Helper.nFormatter(dislikes)}</Subtitle>
        </Row>
      </Row>
    </Container>
  );
};
