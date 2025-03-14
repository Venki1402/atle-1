import express from "express";
import * as contestService from "../services/contestService";

const router = express.Router();

// Sync contests from all platforms
router.post("/sync", async (req, res) => {
  const result = await contestService.syncContests();
  res.json(result);
});

// Get upcoming contests
router.get("/upcoming", async (req, res) => {
  const platforms = req.query.platforms
    ? (req.query.platforms as string).split(",")
    : [];
  const contests = await contestService.getUpcomingContests(platforms);
  res.json(contests);
});

// Get past contests
router.get("/past", async (req, res) => {
  const platforms = req.query.platforms
    ? (req.query.platforms as string).split(",")
    : [];
  const contests = await contestService.getPastContests(platforms);
  res.json(contests);
});

// Bookmark a contest
router.put("/:id/bookmark", async (req, res) => {
  const { id } = req.params;
  const { isBookmarked } = req.body;
  const contest = await contestService.bookmarkContest(id, isBookmarked);
  res.json(contest);
});

// Update solution URL
router.put("/:id/solution", async (req, res) => {
  const { id } = req.params;
  const { solutionUrl } = req.body;
  const contest = await contestService.updateSolutionUrl(id, solutionUrl);
  res.json(contest);
});

export default router;
