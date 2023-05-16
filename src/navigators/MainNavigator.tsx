import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { QuestionList, QuestionDetailScreen } from "../screens";
import { CodeEditorScreen } from "../screens/CodeEditorScreen";
import { BottomTabNavigator } from "./BottomTabNavigator";
import { QuestionMetadata } from "../core/types";

export type MainStackParamList = {
  BottomTab: undefined;
  QuestionList: undefined;
  QuestionDetail: {
    question: QuestionMetadata;
  };
  CodeEditor: {
    titleSlug: string;
  };
};

export type MainStackNavigatorProp =
  NativeStackNavigationProp<MainStackParamList>;

const Main = createNativeStackNavigator<MainStackParamList>();

export const MainNavigator = () => {
  return (
    <Main.Navigator>
      <Main.Screen
        name="BottomTab"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Main.Screen
        name="QuestionDetail"
        component={QuestionDetailScreen}
        options={{
          headerTitle: "Description",
        }}
      />
      <Main.Screen
        name="CodeEditor"
        component={CodeEditorScreen}
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
    </Main.Navigator>
  );
};
