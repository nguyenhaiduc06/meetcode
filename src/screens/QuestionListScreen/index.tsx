import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components/native";
import { leetCode } from "../../core/LeetCode";
import { useNavigation } from "@react-navigation/native";
import { MainStackNavigatorProp } from "../../navigators";
import { Button, QuestionItem } from "../../components";
import { SearchModal } from "./SearchModal";
import { Filters } from "./Filters";
import { InteractionManager } from "react-native";

export const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  console.log("🚀 ~ questions:", questions);
  const navigation = useNavigation<MainStackNavigatorProp>();

  const searchModal = useRef(null);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() =>
      leetCode.getQuestions().then(setQuestions)
    );
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          iconName="search-line"
          borderColor="transparent"
          backgroundColor="transparent"
          onPress={searchModal.current?.show}
        />
      ),
    });
  }, [navigation]);

  const viewProblemDetail = (question) => {
    navigation.navigate("QuestionDetail", {
      question,
    });
  };

  const handleFiltersChanged = (newFilters) => {
    leetCode.getQuestions({ filters: newFilters }).then(setQuestions);
  };
  return (
    <Container>
      <Filters onFiltersChanged={handleFiltersChanged} />
      <ScrollView>
        {questions.map((question) => (
          <QuestionItem
            key={question.questionId}
            onPress={() => viewProblemDetail(question)}
            {...question}
          />
        ))}
      </ScrollView>
      <SearchModal animationType="fade" ref={searchModal} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${(p) => p.theme.colors.background};
  justify-content: center;
`;

const ScrollView = styled.ScrollView``;
