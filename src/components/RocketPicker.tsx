import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import useRocketStore from "../features/useRocketStore";

type Props = {
  selectedRocketId: string;
  onSelect: (rocketId: string) => void;
};

const RocketPicker = ({ selectedRocketId, onSelect }: Props) => {
  const rockets = useRocketStore((state) => state.rockets);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select a Rocket:</Text>
      <ScrollView horizontal style={styles.ScrollViewContainer}>
        <TouchableOpacity
          style={styles.rocketItem}
          onPress={() => onSelect("")}
        >
          <View style={styles.all} />
          <Text style={styles.rocketName}>All</Text>
        </TouchableOpacity>
        {rockets.map((rocket) => (
          <TouchableOpacity
            key={rocket.id}
            style={[
              styles.rocketItem,
              rocket.id === selectedRocketId && styles.selectedRocketItem,
            ]}
            onPress={() => onSelect(rocket.id)}
          >
            <Image
              source={{ uri: rocket.image || "" }}
              style={styles.rocketImage}
            />
            <Text style={styles.rocketName}>{rocket.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  ScrollViewContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: "#ffffff",
    fontWeight: "semibold",
  },
  rocketItem: {
    alignItems: "center",
    marginRight: 16,
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 10,
    padding: 2,
  },
  selectedRocketItem: {
    borderColor: "#00aaff",
    borderWidth: 2,
    borderRadius: 10,
  },
  rocketImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  rocketName: {
    marginTop: 6,
    color: "#ffffff",
    fontSize: 16,
  },
  all: {
    backgroundColor: "#00aaff",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default RocketPicker;
