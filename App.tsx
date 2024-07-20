import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import LaunchList from "./src/screens/LaunchList";
import LaunchDetails from "./src/screens/LaunchDetails";

export type routeParams = {
  LaunchList: undefined;
  LaunchDetails: { id: string };
};

const queryClient = new QueryClient();

const Stack = createNativeStackNavigator<routeParams>();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="LaunchList" component={LaunchList} />
          <Stack.Screen
            name="LaunchDetails"
            component={LaunchDetails}
            options={{ presentation: "modal" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
