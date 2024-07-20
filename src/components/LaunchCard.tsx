import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

import { spaceGray } from "../contants/colors";

type LaunchCardProps = {
  id: string;
  mission_name: string;
  details: string;
  launch_date_utc: string;
  img: string;
  onPress: () => void;
};

const LaunchCard = ({ ...props }: LaunchCardProps) => {
  return (
    <TouchableOpacity onPress={() => props.onPress()} style={styles.item}>
      <Image
        source={{ uri: props.img }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{props.mission_name}</Text>
        <Text style={styles.date}>
          {new Date(props.launch_date_utc).toLocaleDateString()}
        </Text>
        <Text numberOfLines={3} style={styles.details}>
          {props.details || "No description"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default LaunchCard;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: spaceGray,
    minHeight: 150,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 8,
  },
  textContainer: {
    marginLeft: 10,
    flexShrink: 1,
    position: "relative",
    overflow: "hidden",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  date: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 6,
  },
  details: {
    color: "#fff",
    fontSize: 16,
    marginTop: 5,
    fontWeight: "semibold",
  },
});
