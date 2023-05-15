import React, { FC, useRef, useState } from "react";
import { styled } from "styled-components/native";
import { QuestionItem, Space, Text } from "../../components";
import {
  Modal,
  ModalProps,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { leetCode } from "../../core/LeetCode";
import { useNavigation } from "@react-navigation/native";
import { MainStackNavigatorProp } from "../../navigators";

type SearchModalProps = ModalProps & {
  dismiss: () => void;
};

const Container = styled.View`
  flex: 1;
  background-color: ${(p) => p.theme.colors.background};
`;

// question item has padding left = 16px
// but the left of the search input is rounded
// so we had to set padding left of this row to 12px
// cause it make the left of the search input "visually"
// align with content of question item
const SearchRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 0 16px 12px 12px;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  font-size: 17px;
  color: ${(p) => p.theme.colors.text};
  padding: 8px 12px;
  border-radius: 50%;
  border-width: 1px;
  border-color: ${(p) => p.theme.colors.border};
`;

export const SearchModal: FC<SearchModalProps> = (props) => {
  const { dismiss, ...rest } = props;
  const [questions, setQuestions] = useState([]);
  const [searchKeywords, setSearchKeywords] = useState("");
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<MainStackNavigatorProp>();

  const viewQuestionDetail = (titleSlug) => {
    console.log("🚀 ~ titleSlug:", titleSlug);
    dismiss();
    navigation.navigate("QuestionDetail", {
      titleSlug,
    });
  };
  const search = () => {
    leetCode
      .getQuestions({
        filters: {
          searchKeywords,
        },
      })
      .then(setQuestions);
  };
  return (
    <Modal {...rest}>
      <Container>
        <Space height={insets.top} />
        <SearchRow>
          <SearchInput
            placeholder="Question name"
            clearButtonMode="always"
            returnKeyType="search"
            onSubmitEditing={search}
            autoFocus
            onChangeText={setSearchKeywords}
          />
          <TouchableOpacity onPress={dismiss}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </SearchRow>
        <ScrollView>
          {questions.map((question) => (
            <QuestionItem
              key={question.questionId}
              onPress={() => viewQuestionDetail(question.titleSlug)}
              {...question}
            />
          ))}
        </ScrollView>
      </Container>
    </Modal>
  );
};
