import { useEffect, useMemo, useState } from "react";

import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";

const App = () => {
  const { connectWallet, address, error, provider } = useWeb3();
  console.log("👋Address:", address);

  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);

  useEffect(() => {
    if (!address) {
      return;
    }

    return bundleDropModule
      .balanceOf(address, "0")
      .then((balance) => {
        if (balance.gt(0)) {
          setHasClaimedNFT(true);
          console.log("🌟 this user has a membership NFT")
        } else {
          setHasClaimedNFT(false);
          console.log("😭 this user doesn't have a membership NFT.")
        }
      })
      .catch((error) => {
        setHasClaimedNFT(false);
        console.error("failed to nft balance", error)
      })
  }, [address]);

  if (!address) {
    return (
      <div className="landing">
        <h1>Welcome to JDAO</h1>
        <button onClick={() => connectWallet('injected')} className="btn-hero">
          Connect your wallet
        </button>
      </div>
    );
  }

  return (
    <div className="landing">
      <h1>👀 wallet connected, now what!</h1>
    </div>
  );
};

const sdk = new ThirdwebSDK('rinkeby');

const bundleDropModule = sdk.getBundleDropModule(
  "0xa6f241ac8B3170255987E69CD90c50DC5b80B915"
);

export default App;
