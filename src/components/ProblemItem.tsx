import { FC } from "react";
import { TouchableOpacityProps } from "react-native/types";
import { styled } from "styled-components/native";

const colorNameByDifficulty = {
  Easy: "success",
  Medium: "warning",
  Hard: "danger",
};

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

const Row = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 16px;
  color: ${(p) => p.theme.colors.text};
  font-weight: 600;
`;

const Subtitle = styled.Text`
  font-size: 14px;
  color: ${(p) => p.theme.colors.textDim};
  margin-top: 12px;
`;

const Badge = styled.View`
  background-color: ${(p) => p.theme.colors.foreground};
  border-radius: 50%;
  padding: 2px 6px;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
  margin-top: 4px;
`;

const BadgeTitle = styled.Text<{ difficulty?: string }>`
  font-size: 11px;
  color: ${({ difficulty, theme }) => {
    const colorName = difficulty
      ? colorNameByDifficulty[difficulty]
      : "textDim";
    return theme.colors[colorName];
  }};
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
  return (
    <Container onPress={onPress}>
      <Title>{title}</Title>
      <Row>
        <Badge>
          <BadgeTitle difficulty={difficulty}>{difficulty}</BadgeTitle>
        </Badge>
        {topicTags.map((tag) => (
          <Badge key={tag.name}>
            <BadgeTitle>{tag.name}</BadgeTitle>
          </Badge>
        ))}
      </Row>
      <Row>
        <Subtitle>{`Acceptance: ${acRate.toFixed(
          1
        )}% • Likes: ${likes} • Dislikes: ${dislikes}`}</Subtitle>
      </Row>
    </Container>
  );
};
