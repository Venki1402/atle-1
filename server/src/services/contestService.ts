import axios from 'axios';
import Contest, { IContest } from '../models/Contest';

export async function fetchCodeforcesContests() {
  try {
    const response = await axios.get('https://codeforces.com/api/contest.list');
    const contests = response.data.result.filter(
      (contest: any) => contest.phase === 'BEFORE' || contest.phase === 'FINISHED'
    );
    
    return contests.map((contest: any) => ({
      name: contest.name,
      platform: 'Codeforces',
      startTime: new Date(contest.startTimeSeconds * 1000),
      endTime: new Date((contest.startTimeSeconds + contest.durationSeconds) * 1000),
      duration: contest.durationSeconds / 60,
      url: `https://codeforces.com/contest/${contest.id}`,
      isBookmarked: false
    }));
  } catch (error) {
    console.error('Error fetching Codeforces contests:', error);
    return [];
  }
}

export async function fetchCodeChefContests() {
  try {
    const response = await axios.get('https://www.codechef.com/api/contests');
    const upcomingContests = response.data.future_contests || [];
    const pastContests = response.data.past_contests || [];
    
    const mapContest = (contest: any, isPast = false) => ({
      name: contest.contest_name,
      platform: 'CodeChef',
      startTime: new Date(contest.contest_start_date),
      endTime: new Date(contest.contest_end_date),
      duration: (new Date(contest.contest_end_date).getTime() - 
                new Date(contest.contest_start_date).getTime()) / (1000 * 60),
      url: `https://www.codechef.com/${contest.contest_code}`,
      isBookmarked: false
    });
    
    return [
      ...upcomingContests.map((contest: any) => mapContest(contest)),
      ...pastContests.map((contest: any) => mapContest(contest, true))
    ];
  } catch (error) {
    console.error('Error fetching CodeChef contests:', error);
    return [];
  }
}

export async function fetchLeetCodeContests() {
  try {
    // LeetCode doesn't have a public API, so we'd need to scrape or use a third-party API
    // This is a placeholder implementation
    const response = await axios.get('https://leetcode.com/graphql', {
      params: {
        query: `
          {
            allContests {
              title
              startTime
              duration
              titleSlug
            }
          }
        `
      }
    });
    
    const contests = response.data.data.allContests;
    return contests.map((contest: any) => ({
      name: contest.title,
      platform: 'LeetCode',
      startTime: new Date(contest.startTime * 1000),
      endTime: new Date((contest.startTime + contest.duration) * 1000),
      duration: contest.duration / 60,
      url: `https://leetcode.com/contest/${contest.titleSlug}`,
      isBookmarked: false
    }));
  } catch (error) {
    console.error('Error fetching LeetCode contests:', error);
    return [];
  }
}

export async function syncContests() {
  try {
    const [codeforcesContests, codeChefContests, leetCodeContests] = await Promise.all([
      fetchCodeforcesContests(),
      fetchCodeChefContests(),
      fetchLeetCodeContests()
    ]);
    
    const allContests = [...codeforcesContests, ...codeChefContests, ...leetCodeContests];
    
    // Update database with new contests
    for (const contest of allContests) {
      await Contest.findOneAndUpdate(
        { name: contest.name, platform: contest.platform },
        contest,
        { upsert: true, new: true }
      );
    }
    
    return { success: true, message: 'Contests synced successfully' };
  } catch (error) {
    console.error('Error syncing contests:', error);
    return { success: false, message: 'Failed to sync contests' };
  }
}

export async function getUpcomingContests(platforms: string[] = []) {
  const query: any = { startTime: { $gt: new Date() } };
  
  if (platforms.length > 0) {
    query.platform = { $in: platforms };
  }
  
  return Contest.find(query).sort({ startTime: 1 });
}

export async function getPastContests(platforms: string[] = []) {
  const query: any = { startTime: { $lt: new Date() } };
  
  if (platforms.length > 0) {
    query.platform = { $in: platforms };
  }
  
  return Contest.find(query).sort({ startTime: -1 });
}

export async function bookmarkContest(id: string, isBookmarked: boolean) {
  return Contest.findByIdAndUpdate(id, { isBookmarked }, { new: true });
}

export async function updateSolutionUrl(id: string, solutionUrl: string) {
  return Contest.findByIdAndUpdate(id, { solutionUrl }, { new: true });
}
