import { Service } from "typedi";
import { Request, Response } from 'express';
import GitHubService from "../services/GitHubService";
import { PullRequest } from "../interfaces/PullRequest";
import OpenPullRequest from "../models/OpenPullRequest";
import { RepoPullRequest } from "../interfaces/RepoPullRequest";

@Service()
class GitHubController {
    constructor(private readonly githubService: GitHubService) {}
    
    async getGitHubOpenPullRequests(req: Request, res:Response) {
        const pullRequests: RepoPullRequest[] = await this.githubService.getOpenPullRequests(req.params.owner, req.params.repo);
        const individualPullRequestPromises: Promise<PullRequest>[] = pullRequests.map(pull => this.githubService.getPullRequest(req.params.owner, req.params.repo, pull.number));        
        
        const result = await Promise.all(individualPullRequestPromises).then((individualPullRequest: PullRequest[]) => {
            return individualPullRequest.map((individualPullRequest: PullRequest, i: number) => 
                        new OpenPullRequest(
                            +pullRequests[i].id,
                            +pullRequests[i].number,
                            pullRequests[i].title,
                            pullRequests[i].user.login,
                            +individualPullRequest.commits
                        )
            );
        });

        res.status(200).json(result);
    }
};

export default GitHubController;
