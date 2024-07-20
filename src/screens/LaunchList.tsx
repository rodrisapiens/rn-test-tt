import { useEffect, useState } from "react";
import { Text, FlatList, StyleSheet, View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

import { useLaunches, useRockets } from "../features/queries";
import useRocketStore from "../features/useRocketStore";

import LaunchCard from "../components/LaunchCard";
import Loading from "../components/Loading";
import RocketPicker from "../components/RocketPicker";

import { routeParams } from "../../App";

type Props = NativeStackScreenProps<routeParams, "LaunchList">;

const LaunchList = ({ navigation }: Props) => {
  const { data: launches, isLoading, isError, error } = useLaunches();
  const { data: rockets, isSuccess: isRocketsOk } = useRockets();
  const setRockets = useRocketStore((state) => state.setRockets);
  const rocketsFromStore = useRocketStore((state) => state.rockets);
  const [selectedRocketId, setSelectedRocketId] = useState<string>("");

  useEffect(() => {
    if (isRocketsOk && rockets) {
      setRockets(rockets);
    }
  }, [isRocketsOk, rockets, setRockets]);

  const filteredLaunches = selectedRocketId
    ? launches?.filter((launch) => launch.rocket === selectedRocketId)
    : launches;

  if (isLoading)
    return (
      <View style={styles.altContainer}>
        <Loading />
      </View>
    );
  if (isError)
    return (
      <View style={styles.altContainer}>
        <Text style={styles.errorText}>{error.message}</Text>
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>SpaceX launches</Text>
      <RocketPicker
        selectedRocketId={selectedRocketId}
        onSelect={setSelectedRocketId}
      />
      {!!filteredLaunches && filteredLaunches?.length > 0 ? (
        <FlatList
          data={filteredLaunches}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <LaunchCard
              {...item}
              onPress={() =>
                navigation.navigate("LaunchDetails", { id: item.id })
              }
            />
          )}
        />
      ) : (
        <View style={styles.altContainer}>
          <Text style={styles.errorText}>No launches found yet</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default LaunchList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#000000",
    paddingHorizontal: 16,
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
  },
  altContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  errorText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
  },
});
