import app from "./app.js";
import { config } from "./config/index.js";

app.listen(config.PORT, () => {
  console.log(`Server is running at port ${config.PORT}`);
});
