import app from "./app";
import mongoose from "mongoose";
import config from "./config";

const port = process.env.PORT || 8080;

async function main() {
  try {
    await mongoose.connect(config.DB_URI as string);
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`[server]: Server started at port ${port}`);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}

main();
