import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { ListProblemsScreen, ProblemDetailScreen } from "../screens";
import { CodeEditorScreen } from "../screens/CodeEditorScreen";

export type MainStackParamList = {
  ListProblems: undefined;
  ProblemDetail: {
    titleSlug: string;
  };
  CodeEditor: undefined;
};

export type MainStackNavigatorProp =
  NativeStackNavigationProp<MainStackParamList>;

const Main = createNativeStackNavigator<MainStackParamList>();

export const MainNavigator = () => {
  return (
    <Main.Navigator>
      <Main.Screen
        name="ListProblems"
        component={ListProblemsScreen}
        options={{
          headerTitle: "Problems",
        }}
      />
      <Main.Screen
        name="ProblemDetail"
        component={ProblemDetailScreen}
        options={{
          headerTitle: "Detail",
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
