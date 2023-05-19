import React, { useEffect, useState } from "react";
import { styled } from "styled-components/native";
import { Chip, Space, Text, ProgressBar } from "../../components";
import { RefreshControl, ScrollView, View } from "react-native";
import { useTheme } from "../../hooks";
import { leetCode } from "../../core/LeetCode";
import { ProblemsSolved, UserProfile } from "../../core/types";
import { SolvedProblemsProgress } from "./SolvedProblemsProgress";
import { SolvedProblemsChip } from "./SolvedProblemsChip";

export const ProfileScreen = () => {
  const theme = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(null);
  const [problemsSolved, setProblemsSolved] = useState<ProblemsSolved>(null);
  const [languageStats, setLanguageStats] = useState([]);
  const [skillStats, setSkillStats] = useState(null);
  const {
    intermediate = [],
    fundamental = [],
    advanced = [],
  } = skillStats ?? {};

  const refresh = async () => {
    setRefreshing(true);
    Promise.all([
      leetCode.getUserProfile(),
      leetCode.getUserProblemsSolved(),
      leetCode.getUserLanguageStats(),
      leetCode.getUserSkillStats(),
    ])
      .then((values) => {
        setProfile(values[0]);
        setProblemsSolved(values[1]);
        setLanguageStats(values[2]);
        setSkillStats(values[3]);
      })
      .finally(() => {
        setRefreshing(false);
      });
  };

  useEffect(() => {
    leetCode.getUserProfile().then(setProfile);
    leetCode.getUserProblemsSolved().then(setProblemsSolved);
    leetCode.getUserLanguageStats().then(setLanguageStats);
    leetCode.getUserSkillStats().then(setSkillStats);
  }, []);
  return (
    <Container>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
      >
        <ScrollViewContent>
          <Avatar source={{ uri: profile?.profile?.userAvatar }} />
          <Col>
            <Text size={21} weight={600}>
              {profile?.username}
            </Text>
            <Text dim>Rank #{profile?.profile?.ranking ?? "---"}</Text>
          </Col>

          <Text
            size={17}
            weight={600}
            style={{ alignSelf: "flex-start", marginLeft: 16, marginTop: 16 }}
          >
            Solved problems stats
          </Text>
          <Section>
            <Text weight={600} dim>
              Difficulty
            </Text>

            <Space height={16} />

            <SolvedProblemsProgress
              difficulty="Easy"
              solved={problemsSolved?.easy?.solvedCount}
              total={problemsSolved?.easy?.totalCount}
            />

            <Space height={16} />

            <SolvedProblemsProgress
              difficulty="Medium"
              solved={problemsSolved?.medium?.solvedCount}
              total={problemsSolved?.medium?.totalCount}
            />

            <Space height={16} />

            <SolvedProblemsProgress
              difficulty="Hard"
              solved={problemsSolved?.hard?.solvedCount}
              total={problemsSolved?.hard?.totalCount}
            />
          </Section>

          <Section>
            <Text weight={600} dim>
              Languages
            </Text>
            <Space height={16} />
            <ChipsContainer>
              {languageStats.map((stat) => (
                <SolvedProblemsChip
                  key={`solved-problems-chip-${stat.languageName}`}
                  label={stat.languageName}
                  count={stat.problemsSolved}
                />
              ))}
            </ChipsContainer>
          </Section>

          <Section>
            <Text weight={600} dim>
              Skills
            </Text>
            <Space height={16} />
            <ChipsContainer>
              {intermediate.map((stat) => (
                <SolvedProblemsChip
                  key={`solved-problems-chip-${stat.tagName}`}
                  label={stat.tagName}
                  count={stat.problemsSolved}
                />
              ))}
              {fundamental.map((stat) => (
                <SolvedProblemsChip
                  key={`solved-problems-chip-${stat.tagName}`}
                  label={stat.tagName}
                  count={stat.problemsSolved}
                />
              ))}
              {advanced.map((stat) => (
                <SolvedProblemsChip
                  key={`solved-problems-chip-${stat.tagName}`}
                  label={stat.tagName}
                  count={stat.problemsSolved}
                />
              ))}
            </ChipsContainer>
          </Section>
        </ScrollViewContent>
      </ScrollView>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const ScrollViewContent = styled.View`
  align-items: center;
  padding: 16px;
  gap: 16px;
`;

const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 80px;
  background-color: rgba(255, 255, 255, 0.2);
`;

const Section = styled.View`
  background-color: ${(p) => p.theme.colors.foreground};
  border-radius: 8px;
  padding: 16px;
  align-self: stretch;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
`;

const Col = styled.View`
  align-items: center;
`;

const ChipsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;
