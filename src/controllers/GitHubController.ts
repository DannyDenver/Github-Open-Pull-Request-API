import { Service } from "typedi";
import { Request, Response } from 'express';
import GitHubService from "../services/GitHubService";
import OpenPullRequest from "../models";

@Service()
class GitHubController {
    constructor(private readonly githubService: GitHubService) {}
    
    async getGitHubOpenPullRequests(req: Request, res:Response) {
        const pullRequests = await this.githubService.getOpenPullRequests(req.params.owner, req.params.repo);
        const resultsPromises: Promise<any>[] = pullRequests.map(pull => this.githubService.getPullRequest(req.params.owner, req.params.repo, pull.number));        
        
        const results = await Promise.all(resultsPromises).then(results => {
            return results.map((d:any, i:number) => 
                        new OpenPullRequest(
                            +pullRequests[i].id,
                            +pullRequests[i].number,
                            pullRequests[i].title,
                            pullRequests[i].user.login,
                            +d.commits
                        )
            );
        });

        res.status(200).json(results);
    }
};

export default GitHubController;
