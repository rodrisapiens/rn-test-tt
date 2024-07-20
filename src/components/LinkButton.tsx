import {
  View,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Text,
} from "react-native";

import { linkBlue } from "../contants/colors";

type Props = {
  url: string;
};

const LinkButton = ({ url }: Props) => {
  const handlePress = () => {
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.link}>{url}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  link: {
    color: linkBlue,
    fontSize: 16,
  },
});

export default LinkButton;
