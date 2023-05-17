import React, { FC, useEffect, useState } from "react";
import { styled } from "styled-components/native";
import { Text } from "../../components/Text";
import { DailyChallengeRecord } from "../../core/types";
import { RecordCell } from "./RecordCell";
import { leetCode } from "../../core/LeetCode";
import { Icon } from "../../components";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MainStackNavigatorProp } from "../../navigators";

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const getMaxDaysForMonth = (year, month) => {
  var maxDays = nDays[month];
  if (month == 1) {
    // February
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
      maxDays += 1;
    }
  }
  return maxDays;
};

type DailyChallengeRecordsProps = {};

//todo: refactor

export const DailyChallengeRecords: FC<DailyChallengeRecordsProps> = (
  props
) => {
  const [records, setRecords] = useState<DailyChallengeRecord[]>([]);
  const [medal, setMedal] = useState(null);
  const navigation = useNavigation<MainStackNavigatorProp>();
  const today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth();
  const maxDays = getMaxDaysForMonth(year, month);
  var firstWeekDay = new Date(year, month, 1).getDay();

  var weeks = [];
  var date = 1;
  while (date <= maxDays) {
    const newWeek = Array(7).fill({
      date: null,
      record: null,
    });
    for (let weekDay = 0; weekDay <= 6; weekDay++) {
      const weekDayForDate = (date + firstWeekDay - 1) % 7;
      newWeek[weekDayForDate] = {
        date,
        record: date <= records.length ? records[date - 1] : null,
      };
      date++;
      if (weekDayForDate == 6 || date > maxDays) {
        break;
      }
    }
    weeks.push(newWeek);
  }

  useEffect(() => {
    leetCode.getDailyChallengeRecords().then(setRecords);
    leetCode.getDailyChallengeMedal().then(setMedal);
  }, []);

  const viewQuestionDetail = (question) => {
    if (!question) {
      return;
    }
    navigation.navigate("QuestionDetail", {
      question,
    });
  };

  return (
    <Container>
      <TitleRow>
        <Text size={17} weight={600}>
          Day {today.getDate()}
        </Text>
        <Row>
          <TouchableOpacity>
            <Icon name="arrow-left-s-line" size={16} color="white" />
          </TouchableOpacity>
          <Medal source={{ uri: medal?.config?.icon }} />
          <TouchableOpacity>
            <Icon name="arrow-right-s-line" size={16} color="white" />
          </TouchableOpacity>
        </Row>
      </TitleRow>

      <HeadRow>
        {weekDays.map((weekDays, index) => (
          <HeadCell key={`head-cell-${index}`}>
            <Text dim>{weekDays}</Text>
          </HeadCell>
        ))}
      </HeadRow>

      {weeks.map((week, index) => (
        <BodyRow key={`body-row-${index}`}>
          {week.map(({ date, record }, index) => (
            <RecordCell
              key={`record-cel-${index}`}
              date={date}
              record={record}
              disabled={!record}
              onPress={() => viewQuestionDetail(record?.question)}
            />
          ))}
        </BodyRow>
      ))}
    </Container>
  );
};

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const Container = styled.View`
  background-color: ${(p) => p.theme.colors.foreground};
  padding: 16px;
  margin: 16px;
  border-radius: 8px;
`;

const TitleRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const HeadRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 16px;
`;

const HeadCell = styled.View`
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
`;

const BodyRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

const Medal = styled.Image`
  /* position: absolute;
  top: 0;
  right: 0; */
  width: 32px;
  height: 32px;
`;
