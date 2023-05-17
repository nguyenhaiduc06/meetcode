import React, { forwardRef } from "react";
import { ScrollView } from "react-native";
import { styled } from "styled-components/native";
import { Icon, ModalSheet, Text } from "../../components";
import { useTheme } from "../../hooks";
import { CodeSnippet } from "../../core/types";
import { Modalize, ModalizeProps } from "react-native-modalize";

type SelectLanguageProps = ModalizeProps & {
  codeSnippets: CodeSnippet[];
  selectedIndex: number;
  onSnippetSelected: (index: number) => void;
};

export const SelectCodeSnippet = forwardRef<Modalize, SelectLanguageProps>(
  (props, ref) => {
    const {
      codeSnippets = [],
      selectedIndex,
      onSnippetSelected,
      ...rest
    } = props;
    const theme = useTheme();

    const selectSnippetAtIndex = (index) => {
      // @ts-ignore
      ref.current?.close();
      onSnippetSelected(index);
    };

    return (
      <ModalSheet ref={ref}>
        <TitleRow>
          <StatusRow>
            <Text size={17} weight={600}>
              Select language
            </Text>
          </StatusRow>
        </TitleRow>
        <ScrollView>
          <OptionsContainer>
            {codeSnippets.map(({ lang }, index) => (
              <SelectOption
                selected={index == selectedIndex}
                onPress={() => selectSnippetAtIndex(index)}
              >
                <Text dim={index != selectedIndex}>{lang}</Text>
                {index == selectedIndex && (
                  <Icon
                    name="check-line"
                    size={16}
                    color={theme.colors.success}
                  />
                )}
              </SelectOption>
            ))}
          </OptionsContainer>
        </ScrollView>
      </ModalSheet>
    );
  }
);

const TitleRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const StatusRow = styled.View`
  flex-direction: row;
  align-items: baseline;
  gap: 8px;
`;

const OptionsContainer = styled.View`
  gap: 8px;
`;

const SelectOption = styled.TouchableOpacity<{ selected?: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-radius: 8px;
  background-color: ${(p) => p.theme.colors.foreground};
`;
