import { useEffect, useMemo, useState } from "react";

import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";

const sdk = new ThirdwebSDK('rinkeby');

const bundleDropModule = sdk.getBundleDropModule(
  "0xa6f241ac8B3170255987E69CD90c50DC5b80B915"
);


const App = () => {
  const { connectWallet, address, error, provider } = useWeb3();
  console.log("👋Address:", address);

  const signer = provider ? provider.getSigner() : undefined;

  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);

  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    sdk.setProviderOrSigner(signer);
  }, [signer])

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

  if (hasClaimedNFT) {
    return (
      <div className="member-page">
        <h1>🍪JDAO Member Page</h1>
        <p>Congratulations on being a member🎉</p>
      </div>
    )
  }

  const mintNFT = () => {
    setIsClaiming(true);
    bundleDropModule
      .claim("0", 1)
      .then(() => {
        setHasClaimedNFT(true);
        console.log(
          `successfully minted! Check it out on Opensea: https://testnets.opensea.io/assets/${bundleDropModule.address}/0`
        );
      })
      .catch((err) => {
        console.error('failed to claim', err);
      })
      .finally(() => {
        setIsClaiming(false)
      })
  }

  return (
    <div className="mint-nft">
      <h1>Mint your free 🍪DAO membership NFT</h1>
      <button disabled={isClaiming}
        onClick={() => mintNFT()}>
        {isClaiming ? "Minting..." : "mint your nft (FREE)"}
      </button>
    </div>
  );
  
};




export default App;
