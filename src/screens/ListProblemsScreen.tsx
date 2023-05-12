import React, { useEffect, useState } from "react";
import { styled } from "styled-components/native";
import { leetCode } from "../core/LeetCode";
import { ProblemItem } from "../components/ProblemItem";
import { useNavigation } from "@react-navigation/native";
import { MainStackNavigatorProp, MainStackParamList } from "../navigators";

const Container = styled.View`
  flex: 1;
  background-color: ${(p) => p.theme.colors.background};
  justify-content: center;
`;

const ScrollView = styled.ScrollView``;

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
  color: ${(p) => p.theme.colors.textDim};
`;

export const ListProblemsScreen = () => {
  const [problems, setProblems] = useState([]);
  const navigation = useNavigation<MainStackNavigatorProp>();

  useEffect(() => {
    leetCode.getProblems().then(setProblems);
  }, []);

  const viewProblemDetail = (titleSlug) => {
    console.log("🚀 ~ titleSlug:", titleSlug);
    navigation.navigate("ProblemDetail", {
      titleSlug,
    });
  };
  return (
    <Container>
      <ScrollView>
        {problems.map(({ questionId, ...rest }) => (
          <ProblemItem
            key={questionId}
            onPress={() => viewProblemDetail(rest.titleSlug)}
            {...rest}
          />
        ))}
      </ScrollView>
    </Container>
  );
};
