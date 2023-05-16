import React, { forwardRef } from "react";
import { ModalSheet, ModalSheetProps, Space, Text } from "../../components";
import { Modalize } from "react-native-modalize";
import { styled } from "styled-components/native";
import { ScrollView } from "react-native";

type HintsModalProps = ModalSheetProps & {
  hints: string[];
};

export const HintsModal = forwardRef<Modalize, HintsModalProps>(
  (props, ref) => {
    const { hints = [], ...rest } = props;
    return (
      <ModalSheet ref={ref} {...rest}>
        <Text size={17} weight={600}>
          Hints
        </Text>
        <Space height={16} />
        <ScrollView>
          {hints.map((hint, index) => (
            <HintContainer key={`hint-${index}`}>
              <Text size={17} style={{ lineHeight: 30 }}>
                {hint}
              </Text>
            </HintContainer>
          ))}
        </ScrollView>
      </ModalSheet>
    );
  }
);

const HintContainer = styled.View`
  background-color: ${(p) => p.theme.colors.foreground};
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
`;
