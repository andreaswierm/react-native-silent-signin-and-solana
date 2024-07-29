import { Image, StyleSheet, Button, View } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { dynamic, useDynamic } from "@/client";
import { WalletItem } from "@/components/WalletItem";

export default function HomeScreen() {
  const { auth, wallets } = useDynamic();

  if (!auth.authenticatedUser) {
    return (
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
        headerImage={
          <Image
            source={require("@/assets/images/partial-react-logo.png")}
            style={styles.reactLogo}
          />
        }
      >
        <Button title="Login" onPress={() => dynamic.ui.auth.show()} />
      </ParallaxScrollView>
    );
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <View>
        {wallets.userWallets
          .filter((wallet) => wallet.chain === "solana")
          .map((wallet) => {
            return <WalletItem key={wallet.id} wallet={wallet} />;
          })}
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
