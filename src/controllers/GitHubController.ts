import { Service } from "typedi";
import { Request, Response } from 'express';
import GitHubService from "../services/GitHubService";
import OpenPullRequest from "../models";
import { PullRequest } from "../interfaces/pull-request";

@Service()
class GitHubController {
    constructor(private readonly githubService: GitHubService) {}
    
    async getGitHubOpenPullRequests(req: Request, res:Response) {
        const pullRequests = await this.githubService.getOpenPullRequests(req.params.owner, req.params.repo);
        const individualPullRequestsPromises: Promise<any>[] = pullRequests.map(pull => this.githubService.getPullRequest(req.params.owner, req.params.repo, pull.number));        
        
        const result = await Promise.all(individualPullRequestsPromises).then(individualPullRequest => {
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
