import sdk from "./1-initialize-sdk.js";

const app = sdk.getAppModule("0xb9Ca1c900363bDeC84C85D115e840a09EE825Ef4");

(async () => {
  try {
    const tokenModule = await app.deployTokenModule({
      name: "JDAO Governance Token",
      symbol: "DAVE",
    });
    console.log(
      "✅ successfully deployed token module, address:",
      tokenModule.address
    );
  } catch (error) {
    console.error("failed to deploy token module", error);
  }
})();
