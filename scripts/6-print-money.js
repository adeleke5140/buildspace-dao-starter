import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const tokenModule = sdk.getTokenModule(
  "0xa6f241ac8B3170255987E69CD90c50DC5b80B915"
);

(async () => {
  try {
    const amount = 1_000_000_000;
    const amountWith18Decimals = ethers.utils.parseUnits(amount.toString(), 18);
    await tokenModule.mint(amountWith18Decimals);
    const totalSupply = await tokenModule.totalSupply();

    console.log(
      "✅ There now is",
      ethers.utils.formatUnits(totalSupply, 18),
      "$DAVE in circulation"
    );
  } catch (error) {
    console.error("Failed to print money", error);
  }
})();
