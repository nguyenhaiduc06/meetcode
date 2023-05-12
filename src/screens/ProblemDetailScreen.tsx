import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { styled } from "styled-components/native";
import { MainStackParamList } from "../navigators";
import { leetCode } from "../core/LeetCode";
import RenderHTML from "react-native-render-html";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { darkTheme } from "../theme";

const Container = styled.View`
  flex: 1;
`;

const ScrollViewContainer = styled.View`
  flex: 1;
  padding: 16px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${(p) => p.theme.colors.text};
`;

export const ProblemDetailScreen = () => {
  const [problem, setProblem] = useState(null);
  const route = useRoute<RouteProp<MainStackParamList>>();
  const insets = useSafeAreaInsets();
  const { titleSlug } = route.params;
  useEffect(() => {
    leetCode.getProblemDetail(titleSlug).then(setProblem);
  }, []);

  return (
    <Container>
      <ScrollView>
        <ScrollViewContainer>
          <Title>{problem?.title}</Title>
          {problem && (
            <RenderHTML
              contentWidth={200}
              source={{
                html: problem.content,
              }}
              tagsStyles={tagsStyles}
            />
          )}
          <View style={{ height: insets.bottom }} />
        </ScrollViewContainer>
      </ScrollView>
    </Container>
  );
};

const tagsStyles = {
  p: {
    fontSize: 16,
    color: darkTheme.colors.textDim,
  },
  pre: {
    fontSize: 16,
    color: darkTheme.colors.textDim,
  },
  ul: {
    fontSize: 16,
    color: darkTheme.colors.textDim,
  },
};
