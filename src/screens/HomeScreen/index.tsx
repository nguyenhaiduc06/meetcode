import React, { useEffect, useState } from "react";
import { styled } from "styled-components/native";
import { leetCode } from "../../core/LeetCode";
import { Space, StudyPlanItem, Text } from "../../components";
import { ScrollView, View } from "react-native";

const Container = styled.View`
  flex: 1;
`;

const StudyPlansContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 16px;
  margin-top: 8px;
  gap: 16px;
`;

export const HomeScreen = () => {
  const [studyPlans, setStudyPlans] = useState([]);
  const [dailyChallengeRecords, setDailyChallengeRecords] = useState([]);

  useEffect(() => {
    leetCode.getStudyPlans().then(setStudyPlans);
    leetCode.getDailyCodingQuestionRecords().then(setDailyChallengeRecords);
  }, []);
  return (
    <Container>
      <Space height={16} />
      <Text size={24} weight={600} style={{ paddingHorizontal: 16 }}>
        Study plans
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0 }}
      >
        <StudyPlansContainer>
          {studyPlans.map((plan) => (
            <StudyPlanItem {...plan} />
          ))}
        </StudyPlansContainer>
      </ScrollView>
      <Space height={16} />
      <Text size={24} weight={600} style={{ paddingHorizontal: 16 }}>
        Daily challenges
      </Text>
      <View
        style={{
          backgroundColor: "red",
          height: 300,
          marginHorizontal: 16,
          marginTop: 8,
        }}
      />
    </Container>
  );
};
