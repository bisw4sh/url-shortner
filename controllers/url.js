import { nanoid } from "nanoid";
import { dbcn } from "../models/url.js";

export async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortID = nanoid();

  await dbcn.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.json({ id: shortID });
}

export async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await dbcn.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}