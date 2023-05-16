import React, { forwardRef } from "react";
import { Modalize, ModalizeProps } from "react-native-modalize";
import { styled } from "styled-components/native";
import { Space } from "./Space";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type ModalSheetProps = ModalizeProps & {};

export const ModalSheet = forwardRef<Modalize, ModalSheetProps>(
  (props, ref) => {
    const { children, ...rest } = props;
    const insets = useSafeAreaInsets();
    return (
      <Modalize
        adjustToContentHeight
        ref={ref}
        modalStyle={{ backgroundColor: "transparent" }}
        withHandle={false}
        withReactModal
        {...rest}
      >
        <Card>{children}</Card>
        <Space height={insets.bottom} />
      </Modalize>
    );
  }
);

const Card = styled.View`
  height: 400px;
  padding: 16px;
  background-color: ${(p) => p.theme.colors.background};
  border-radius: 16px;
  margin: 16px;
  border: 1px solid ${(p) => p.theme.colors.border};
`;
