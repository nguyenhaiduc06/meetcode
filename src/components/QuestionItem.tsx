import { FC } from "react";
import { TouchableOpacityProps } from "react-native/types";
import { styled } from "styled-components/native";
import { useTheme } from "../hooks";
import Helper from "../utils/Helper";
import { spacing } from "../theme";
import { Space, Text, Chip, Icon } from ".";
import { QuestionDescriptionData } from "../core/types";

type QuestionItemProps = QuestionDescriptionData & TouchableOpacityProps & {};

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

export const QuestionItem: FC<QuestionItemProps> = ({
  onPress,
  difficulty,
  title,
  likes,
  dislikes,
  acRate,
  topicTags,
  status,
}) => {
  const theme = useTheme();

  const statusIconName =
    status == "ac"
      ? "checkbox-circle-line"
      : status == "notac"
      ? "indeterminate-circle-line"
      : "checkbox-blank-circle-line";
  const statusIconColor =
    status == "ac"
      ? theme.colors.success
      : status == "notac"
      ? theme.colors.warning
      : theme.colors.textDim;
  const difficultyLabelColor = Helper.getColorByDifficulty(difficulty);

  return (
    <Container onPress={onPress}>
      <Row gap={4}>
        <Icon name={statusIconName} size={20} color={statusIconColor} />
        <Text size={17} weight={600} style={{ flex: 1 }} numberOfLines={1}>
          {title}
        </Text>
      </Row>
      <Space height={8} />
      <Row gap={spacing.s}>
        <Chip label={difficulty} labelColor={difficultyLabelColor} />
        {topicTags.map((tag) => (
          <Chip
            key={tag.name}
            label={tag.name}
            labelColor={theme.colors.textDim}
          />
        ))}
      </Row>
      <Row style={{ marginTop: 12 }} gap={spacing.l}>
        <Row gap={spacing.xs}>
          <Text dim>Acceptance: </Text>
          <Text>{acRate.toFixed(1)}%</Text>
        </Row>
        <Row gap={spacing.xs}>
          <Icon name="thumb-up-line" size={14} color={theme.colors.textDim} />
          <Text>{Helper.nFormatter(likes)}</Text>
        </Row>
        <Row gap={spacing.xs}>
          <Icon name="thumb-down-line" size={14} color={theme.colors.textDim} />
          <Text>{Helper.nFormatter(dislikes)}</Text>
        </Row>
      </Row>
    </Container>
  );
};
