import { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import LinkButton from "../components/LinkButton";
import Loading from "../components/Loading";

import { useLaunchDetails } from "../features/queries";
import useRocketStore from "../features/useRocketStore";
import { spaceGray } from "../contants/colors";

import { routeParams } from "../../App";

type Props = NativeStackScreenProps<routeParams, "LaunchDetails">;

const LaunchDetails = ({ route, navigation }: Props) => {
  const { id } = route.params;
  const {
    data: launchDetails,
    isLoading,
    isError,
    error,
  } = useLaunchDetails(id);

  const rockets = useRocketStore((state) => state.rockets);

  const currentRocket = useMemo(() => {
    return rockets.find((rocket) => rocket.id === launchDetails?.rocket);
  }, [rockets, launchDetails?.rocket]);

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

  if (!launchDetails)
    return (
      <View style={styles.altContainer}>
        <Text style={styles.errorText}>No details found</Text>
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollViewContainer}>
        <Text style={styles.title}>{launchDetails.mission_name}</Text>
        <Text style={styles.date}>
          {new Date(launchDetails.launch_date_utc).toLocaleDateString()}
        </Text>
        <Text style={styles.details}>
          {launchDetails.details || "No details available"}
        </Text>
        <Image
          source={{ uri: launchDetails.img }}
          width={100}
          height={100}
          resizeMode="contain"
          style={styles.lauchLogo}
        />
        {!!currentRocket && (
          <View style={styles.rocketSection}>
            <Text style={styles.h2}>Rocket details:</Text>
            <Text style={styles.details}>
              Rocket name: {currentRocket?.name || "Rocket name not found"}
            </Text>
            <Text style={styles.details}>
              Rocket type: {currentRocket?.type || "Rocket type not found"}
            </Text>
            <Image
              source={{ uri: currentRocket?.image || "" }}
              style={styles.rocketImage}
            />
          </View>
        )}
        {launchDetails.links.article_link && (
          <View style={styles.section}>
            <Text style={styles.h2}>Read more:</Text>
            <LinkButton url={launchDetails.links.article_link} />
          </View>
        )}
        {launchDetails.links.video_link && (
          <View style={styles.section}>
            <Text style={styles.h2}>Watch video</Text>
            <LinkButton url={launchDetails.links.video_link} />
          </View>
        )}

        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.h2}>Go back</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LaunchDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: spaceGray,
    padding: 16,
  },
  date: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  h2: {
    fontSize: 20,
    color: "#ffffff",
    marginBottom: 4,
    textDecorationLine: "underline",
  },
  lauchLogo: {
    marginVertical: 16,
  },
  details: {
    color: "#ffffff",
    fontSize: 16,
    marginBottom: 8,
  },
  errorText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
  },
  altContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: spaceGray,
  },
  rocketSection: {
    marginVertical: 16,
  },
  rocketImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginVertical: 16,
  },
  goBackButton: {
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  scrollViewContainer: {
    flex: 1,
  },
  section: {
    marginVertical: 16,
  },
});
