import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
  "0xa6f241ac8B3170255987E69CD90c50DC5b80B915"
);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "Junior developer badge",
        description: "This NFT will give you access to JDAO!",
        image: readFileSync("scripts/assets/jdo.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();
