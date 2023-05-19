import React, { forwardRef, useImperativeHandle, useState } from "react";
import { styled } from "styled-components/native";
import { Modal, ModalProps, ScrollView, TouchableOpacity } from "react-native";
import { Text } from "../../components";

type LoadingModalProps = ModalProps & {};

const Container = styled.View`
  flex: 1;
  background-color: ${(p) => p.theme.colors.background};
  border: 1px solid red;
`;

export const LoadingModal = forwardRef<any, LoadingModalProps>((props, ref) => {
  const { ...rest } = props;
  const [visible, setVisible] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      show,
      hide,
    }),
    []
  );

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  return (
    <Modal visible={visible} {...rest}>
      <Container>
        <Text>Loading</Text>
      </Container>
    </Modal>
  );
});
