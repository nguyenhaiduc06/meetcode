import React, { useEffect, useState } from "react";
import { styled } from "styled-components/native";
import { leetCode } from "../../core/LeetCode";
import { useNavigation } from "@react-navigation/native";
import { MainStackNavigatorProp } from "../../navigators";
import { Button, Text, QuestionItem } from "../../components";
import { Difficulty } from "../../core/types";
import { SearchModal } from "./SearchModal";

const Container = styled.View`
  flex: 1;
  background-color: ${(p) => p.theme.colors.background};
  justify-content: center;
`;

const TopicTagsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  gap: 8px;
`;

const ScrollView = styled.ScrollView``;

export const QuestionList = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>("EASY");
  const [showSearch, setShowSearch] = useState(false);
  const [questions, setQuestions] = useState([]);
  const navigation = useNavigation<MainStackNavigatorProp>();

  const openSearch = () => {
    setShowSearch(true);
  };

  const closeSearch = () => {
    setShowSearch(false);
  };

  useEffect(() => {
    leetCode.getQuestions().then(setQuestions);
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          iconName="search-line"
          borderColor="transparent"
          backgroundColor="transparent"
          onPress={openSearch}
        />
      ),
    });
  }, [navigation]);

  const viewProblemDetail = (titleSlug) => {
    navigation.navigate("QuestionDetail", {
      titleSlug,
    });
  };
  return (
    <Container>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0 }}
      >
        <TopicTagsContainer>
          <Button size="sm" label={difficulty ?? "Difficulty"} />
          <Button size="sm" label="Status" />
          <Button size="sm">
            <Text size={13} dim>
              0
            </Text>
            <Text size={13}>Tags</Text>
          </Button>
        </TopicTagsContainer>
      </ScrollView>
      <ScrollView>
        {questions.map(({ questionId, ...rest }) => (
          <QuestionItem
            key={questionId}
            onPress={() => viewProblemDetail(rest.titleSlug)}
            {...rest}
          />
        ))}
      </ScrollView>
      <SearchModal
        visible={showSearch}
        animationType="fade"
        transparent
        dismiss={closeSearch}
      />
    </Container>
  );
};
