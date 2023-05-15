import React, { FC } from "react";
import { DailyChallengeRecord } from "../../core/types";
import { styled } from "styled-components/native";
import { TouchableOpacityProps } from "react-native";
import { Icon, Text } from "../../components";
import { useTheme } from "../../hooks";

type RecordCellProps = TouchableOpacityProps & {
  date: number;
  record: DailyChallengeRecord;
};

const Container = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  /* border: 1px solid red; */
`;

const Indicator = styled.View`
  position: absolute;
  bottom: 4px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: ${(p) => p.theme.colors.danger};
`;

export const RecordCell: FC<RecordCellProps> = (props) => {
  const { date, record, ...rest } = props;
  const theme = useTheme();
  return (
    <Container {...rest}>
      {record && record.userStatus == "Finish" ? (
        <Icon
          name="checkbox-circle-line"
          size={20}
          color={theme.colors.success}
        />
      ) : (
        <Text>{date}</Text>
      )}
      {record && record.userStatus == "NotStart" && <Indicator />}
    </Container>
  );
};
