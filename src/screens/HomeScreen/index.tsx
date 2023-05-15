import React, { useEffect, useState } from "react";
import { styled } from "styled-components/native";
import { leetCode } from "../../core/LeetCode";
import { Button, Space, StudyPlanItem, Text } from "../../components";
import { ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MainStackNavigatorProp } from "../../navigators";
import { useTheme } from "../../hooks";
import { DailyChallengeRecords } from "./DailyChallengeRecords";

const Container = styled.View`
  flex: 1;
`;

const StudyPlansContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 16px;
  margin-top: 16px;
  gap: 16px;
`;

export const HomeScreen = () => {
  const [studyPlans, setStudyPlans] = useState([]);

  const navigation = useNavigation<MainStackNavigatorProp>();
  const theme = useTheme();

  useEffect(() => {
    leetCode.getStudyPlans().then(setStudyPlans);
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          iconName="notification-line"
          borderColor="transparent"
          backgroundColor="transparent"
        />
      ),
    });
  });

  return (
    <Container>
      <ScrollView>
        <Space height={24} />
        <Text size={21} weight={600} style={{ paddingHorizontal: 16 }}>
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
        <Space height={24} />
        <Text size={21} weight={600} style={{ paddingHorizontal: 16 }}>
          Daily challenges
        </Text>
        <DailyChallengeRecords />
      </ScrollView>
    </Container>
  );
};
