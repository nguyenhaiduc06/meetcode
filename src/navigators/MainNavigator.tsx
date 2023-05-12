import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { ListProblemsScreen, ProblemDetailScreen } from "../screens";

export type MainStackParamList = {
  ListProblems: undefined;
  ProblemDetail: {
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
    </Main.Navigator>
  );
};
