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

const ScrollView = styled.ScrollView`
  flex: 1;
  border-width: 1px;
  border-color: red;
`;

export const ListProblemsScreen = () => {
  const [problems, setProblems] = useState([]);
  const navigation = useNavigation<MainStackNavigatorProp>();

  useEffect(() => {
    leetCode.getProblems().then(setProblems);
  }, []);

  const viewProblemDetail = (titleSlug) => {
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
