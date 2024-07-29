import { createClient } from "@dynamic-labs/client";
import { ReactNativeExtension } from "@dynamic-labs/react-native-extension";
import { SolanaExtension } from "@dynamic-labs/solana-extension";
import { useReactiveClient } from "@dynamic-labs/react-hooks";

const ENVIORNMENT_ID = "-- env id --";

export const dynamic = createClient({
  environmentId: ENVIORNMENT_ID as string,
  appName: "BAGS",
})
  .extend(
    ReactNativeExtension({
      appOrigin: "https://bags.fm",
    })
  )
  .extend(SolanaExtension());

export const useDynamic = () => useReactiveClient(dynamic);

export const destinationAddress = "--destination address --";
export const amount = 0.008;
