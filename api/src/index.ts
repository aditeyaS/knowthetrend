import "dotenv/config";
import { topics } from "./topics";

async function main() {
  if (process.env.NODE_ENV === "development") {
    console.info("🏁 Start, 🧪 development");
  } else {
    console.info("🏁 Start, 📈 production");
    await topics();
  }
  console.log("🤖 Complete");
}
main();
