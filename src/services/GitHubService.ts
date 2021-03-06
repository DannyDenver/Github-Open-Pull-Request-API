import { Service } from "typedi";
import ApiService from "./ApiService";
import { RepoPullRequest } from "../interfaces/RepoPullRequest";
import { PullRequest } from "../interfaces/PullRequest";
require("dotenv").config();

@Service()
class GitHubService {
    constructor(private readonly apiService: ApiService) {}
    
    getOpenPullRequests(owner: string, repo:string): Promise<RepoPullRequest[]> {
        return this.apiService.get(`https://api.github.com/repos/${owner}/${repo}/pulls?state=opened`, process.env.TOKEN && process.env.TOKEN);
    }

    getPullRequest(owner: string, repo:string, pullNumber: number): Promise<PullRequest> {
        return this.apiService.get(`https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}`, process.env.TOKEN && process.env.TOKEN);
    }
}

export default GitHubService;