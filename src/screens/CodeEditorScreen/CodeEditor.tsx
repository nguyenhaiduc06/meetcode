import React, {
  FC,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { CodeSnippet } from "../../core/types";
import { styled } from "styled-components/native";
import { Icon, Text } from "../../components";
import { useTheme } from "../../hooks";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Keyboard, ScrollView, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Helper from "../../utils/Helper";

const actionsQueue = [];

type TextInputSelection = {
  start: number;
  end: number;
};

type CodeEditorProps = {
  codeSnippet: CodeSnippet;
};

export const CodeEditor: FC<CodeEditorProps> = forwardRef((props, ref) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const keyboard = useAnimatedKeyboard();
  const navigation = useNavigation();

  const { codeSnippet } = props;

  useEffect(() => {
    setValue(codeSnippet?.code ?? "");
  }, [codeSnippet]);

  const [showSubmenu, setShowSubmenu] = useState(false);
  const [value, setValue] = useState<string>(codeSnippet?.code);

  const inputRef = useRef<TextInput>(null);
  const inputSelection = useRef<TextInputSelection>({ start: 0, end: 0 });

  useImperativeHandle(ref, () => ({ value }), []);

  const translatedStyle = useAnimatedStyle(() => {
    return {
      height: Math.max(keyboard.height.value, insets.bottom),
    };
  });

  // Negative values move the cursor to the left
  const moveCursor = (currentPosition: number, offset: number) => {
    const newPosition = currentPosition + offset;
    inputRef.current?.setNativeProps({
      selection: {
        start: newPosition,
        end: newPosition,
      },
    });
    return newPosition;
  };

  const addClosingBrace = (brace: string) => {
    setTimeout(() => {
      let cursorPosition = inputSelection.current.start;
      cursorPosition = moveCursor(cursorPosition, -1);
      setValue((val) =>
        Helper.insertStringAt(val, cursorPosition, Helper.getCloseBrace(brace))
      );
    }, 10);
  };

  const increaseIndent = () => {
    console.log("increase indent");

    const { start, end } = inputSelection.current;
    const lines = value.split("\n");
    var charCount = 0;
    for (let i in lines) {
      if (charCount < start && start < charCount + lines[i].length) {
        // current selected line
        lines[i] = "    " + lines[i];
        break;
      }
      charCount += lines[i].length;
    }
    console.log(lines);

    setValue(lines.join("\n"));
  };

  const decreaseIndent = () => {};

  const addKey = (key) => {};

  const handleKeyPress = (event) => {
    const key = event.nativeEvent.key;
    if (Helper.isOpenBrace(key)) {
      actionsQueue.push({
        action: "addText",
        value: Helper.getCloseBrace(key),
      });
    }
  };

  const handleChangeText = (text) => {
    setValue(text);
  };

  // TODO: refactor
  // I have no idea why this function works
  // I should review and make the code clearer later
  const handleSelectionChange = (event) => {
    const currentSelection = inputSelection.current;
    const newSelection = event.nativeEvent.selection;

    if (actionsQueue.length == 0) {
      inputSelection.current = newSelection;
      return;
    }

    const action = actionsQueue.shift();

    //
    if (action.action == "addText") {
      setValue((val) =>
        Helper.insertStringAt(val, currentSelection.start, action.value)
      );

      actionsQueue.push({ action: "moveCursor", value: -1 });

      inputSelection.current = newSelection;
    }

    if (action.action == "moveCursor") {
      setTimeout(() => {
        inputRef.current?.setNativeProps({
          selection: {
            start: currentSelection.start,
            end: currentSelection.end,
          },
        });
        inputSelection.current = currentSelection;
      }, 10);
      return;
    }
  };

  const handleEndEditing = (event) => {
    console.log("end");
  };

  return (
    <Container>
      <Input
        ref={inputRef}
        defaultValue={codeSnippet?.code}
        value={value}
        multiline
        textAlignVertical="top"
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        onScroll={() => console.log("scrolling")}
        onSelectionChange={handleSelectionChange}
        onChangeText={handleChangeText}
        onKeyPress={handleKeyPress}
        onEndEditing={handleEndEditing}
      />
      <ScrollView
        horizontal
        style={{ flexGrow: 0 }}
        keyboardShouldPersistTaps="always"
      >
        <ToolbarContainer>
          <ToolbarButton onPress={increaseIndent}>
            <Icon name="indent-decrease" size={16} color={theme.colors.text} />
          </ToolbarButton>
          <ToolbarButton onPress={decreaseIndent}>
            <Icon name="indent-increase" size={16} color={theme.colors.text} />
          </ToolbarButton>
          {["(", "[", "{", ":", ";", "'", '"'].map((char) => (
            <ToolbarButton
              key={char}
              onLongPress={() => {
                setShowSubmenu(true);
                navigation.setOptions({
                  gestureEnabled: false,
                });
              }}
            >
              <MonoText>{char}</MonoText>
            </ToolbarButton>
          ))}
        </ToolbarContainer>
        <ToolbarButton onPress={Keyboard.dismiss}>
          <Icon name="keyboard-box-line" size={16} color={theme.colors.text} />
        </ToolbarButton>
      </ScrollView>
      <Animated.View style={translatedStyle} />
    </Container>
  );
});

const Container = styled.View`
  flex: 1;
`;

const Input = styled.TextInput`
  flex: 1;
  font-family: "IBMPlexMono_400Regular";
  font-size: 16px;
  color: ${(p) => p.theme.colors.text};
  padding: 0 16px;
`;

const ToolbarContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ToolbarButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
`;

const MonoText = styled(Text)`
  font-size: 17px;
  font-family: "IBMPlexMono_400Regular";
`;
