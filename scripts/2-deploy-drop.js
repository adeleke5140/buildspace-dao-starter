import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const app = sdk.getAppModule("0xb9Ca1c900363bDeC84C85D115e840a09EE825Ef4");

(async () => {
  try {
    const bundleDropModule = await app.deployBundleDropModule({
      name: "JDAO Membership",

      description: "A DAO for junior developer association",

      image: readFileSync("scripts/assets/jdo.png"),

      primarySaleRecipientAddress: ethers.constants.AddressZero,
    });

    console.log(
      "✅ Successfully deployed bundleDrop module, address:",
      bundleDropModule.address
    );
    console.log(
      "✅ bundleDrop metadata:",
      await bundleDropModule.getMetadata()
    );
  } catch (error) {
    console.log("failed to deploy bundleDrop module", error);
  }
})();
