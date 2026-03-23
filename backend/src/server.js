import app from "./app.js";
import { PORT } from "./config/index.js";
import { connectDB } from "./db/index.js";

app.listen(PORT, async () => {
  console.log(`Server is running on Port: http://localhost:${PORT}`);
  await connectDB();
});
