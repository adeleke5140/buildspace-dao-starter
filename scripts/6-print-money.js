import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const tokenModule = sdk.getTokenModule(
  "0x3e0a71e56DE9c7fA64337Ad4B39a6166A3e09a10"
);

(async () => {
  try {
    const amount = 1000000000;
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
