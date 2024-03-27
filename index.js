import express from "express";
import { connectToMongoDB } from "./Connection.js";
import { dbcn } from "./models/url.js";
import urlRoute from "./routes/url.js";
const PORT = process.env.PORT || 8080;

const app = express();

connectToMongoDB().then(() => console.log("MongoDB connected"));

app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await dbcn.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
