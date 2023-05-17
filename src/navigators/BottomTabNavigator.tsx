import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import { HomeScreen, ProfileScreen, QuestionList } from "../screens";
import { Icon } from "../components";

export type BottomTabParamList = {
  Home: undefined;
  QuestionList: undefined;
  Settings: undefined;
  Profile: undefined;
};

export type BottomTabNavigatorProp =
  BottomTabNavigationProp<BottomTabParamList>;

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => {
            return (
              <Icon
                name={focused ? "home-fill" : "home-line"}
                size={20}
                color={color}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="QuestionList"
        component={QuestionList}
        options={{
          tabBarIcon: ({ color, focused }) => {
            return (
              <Icon
                name={focused ? "file-list-fill" : "file-list-line"}
                size={20}
                color={color}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, focused }) => {
            return (
              <Icon
                name={focused ? "user-3-fill" : "user-3-line"}
                size={20}
                color={color}
              />
            );
          },
        }}
      />
    </BottomTab.Navigator>
  );
};
