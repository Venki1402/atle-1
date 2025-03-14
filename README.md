# Contest Tracker

## Problem Statement

In the competitive programming world, it can be **challenging to keep track of contest dates and timings across multiple platforms** like Codeforces, CodeChef, and LeetCode. Contest schedules vary significantly, and missing contests can result in lost opportunities for practice and improvement. Contest Tracker aims to solve this problem by providing a unified platform to track upcoming and past contests across these platforms, allowing users to filter contests, bookmark important ones, and even add solution links for reference.

## Demo
[OneDrive Video](https://sstscaler-my.sharepoint.com/:v:/g/personal/sai_23bcs10095_ms_sst_scaler_com/EQo-V7PwrBxBgQxYtt8IKcYB2LKeL82zILKvwhVpW4tUiQ?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=8zjWbz)

## Features

1. **Track Contests Across Platforms**:
   - Fetch and display upcoming and past contests from Codeforces, CodeChef, and LeetCode.
   - Unified view for all contests.

2. **Filter Contests by Platform**:
   - Users can filter contests based on one or more platforms (e.g., Codeforces + LeetCode).

3. **Bookmark Contests**:
   - Bookmark contests for easy access.
   - Manage bookmarked contests in a dedicated tab.

4. **Add Solution Links**:
   - Add links to solutions for past contests.
   - Edit or update solution links directly from the interface.

## Technologies Used

### Frontend
- **React** with TypeScript
- **Vite** for fast development
- **shadcn UI** for styling
- **TailwindCSS** for responsive design

### Backend
- **Node.js** with TypeScript
- **Express.js** for RESTful APIs
- **MongoDB** with Mongoose for database management
- **Axios** for fetching external APIs

## API Endpoints

### Contest Management
1. `GET /api/contests/upcoming?platforms=codeforces,leetcode`
   - Fetch upcoming contests filtered by platforms.
2. `GET /api/contests/past?platforms=codeforces`
   - Fetch past contests filtered by platforms.
3. `PUT /api/contests/:id/bookmark`
   - Bookmark/unbookmark a contest.
4. `PUT /api/contests/:id/solution`
   - Add or update a solution link for a contest.
5. `POST /api/contests/sync`
   - Sync contests from all platforms (Codeforces, CodeChef, LeetCode).

## Installation Guide

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-name/contest-tracker.git
   cd contest-tracker/server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the `server` directory with the following content:
   ```
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/contest-tracker
   ```

4. Start the backend server:
   ```bash
   tsc -b
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

4. Open the application in your browser at `http://localhost:8080`.

## Scheduled Syncing of Contests

The backend automatically syncs contest data every 6 hours using `node-cron`. This ensures that users always see up-to-date contest information.

## Future Enhancements

1. Add support for more competitive programming platforms like AtCoder and HackerRank.
2. Implement notifications/reminders for bookmarked contests.
3. Improve error handling for external API failures.
4. Add user authentication to save preferences across sessions.
5. Implement Pagination for past contests
