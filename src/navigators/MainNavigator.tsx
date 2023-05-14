import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { QuestionList, QuestionDetailScreen } from "../screens";
import { CodeEditorScreen } from "../screens/CodeEditorScreen";

export type MainStackParamList = {
  QuestionList: undefined;
  QuestionDetail: {
    titleSlug: string;
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
        name="QuestionList"
        component={QuestionList}
        options={{
          headerTitle: "Problems",
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
