import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components/native";
import { leetCode } from "../../core/LeetCode";
import { useNavigation } from "@react-navigation/native";
import { MainStackNavigatorProp } from "../../navigators";
import { Button, QuestionItem } from "../../components";
import { SearchModal } from "./SearchModal";
import { Filters } from "./Filters";
import { LoadingModal } from "./LoadingModal";

export const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const navigation = useNavigation<MainStackNavigatorProp>();

  const searchModal = useRef(null);
  const loadingModal = useRef(null);

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
      <LoadingModal animationType="fade" ref={loadingModal} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${(p) => p.theme.colors.background};
  justify-content: center;
`;

const ScrollView = styled.ScrollView``;
