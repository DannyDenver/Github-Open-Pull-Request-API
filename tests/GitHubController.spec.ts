import { RepoPullRequest } from '../src/interfaces/RepoPullRequest';
import GitHubService from "../src/services/GitHubService";
import { PullRequest } from "../src/interfaces/PullRequest";
import GitHubController from '../src/controllers/GitHubController';
import { Request, Response } from 'express';
import { getMockReq, getMockRes } from '@jest-mock/express'


const repoPullRequests: RepoPullRequest[] = [
    {
        id: 1,
        number:2,
        title: "New Pull Request",
        user: {
            login: "Danman"
        }
    },
    {
        id: 2,
        number:3,
        title: "Second Pull Request",
        user: {
            login: "Philip"
        }
    }
];

const pullRequest: PullRequest = {
    commits: 22
};

const req = getMockReq({params: {
    owner: "dan",
    repo: "github-api"
}});


const { res } = getMockRes({
    json: jest.fn().mockImplementation(() => {}),
    status: jest.fn().mockImplementation(() => {})
  });

describe("When using GithubController", () => {
    let gitHubController: GitHubController;
    const MockGitHubService = <jest.Mock<GitHubService>>GitHubService;
    let gitHubServiceMock = new MockGitHubService();
    
    beforeAll(async () => {
        gitHubServiceMock.getPullRequest = jest.fn().mockReturnValue(new Promise(
            (resolve: any) => resolve(pullRequest)));
        
        gitHubServiceMock.getOpenPullRequests = jest.fn().mockReturnValue(new Promise((resolve) => resolve(repoPullRequests)));

        gitHubController = new GitHubController(gitHubServiceMock);
        await gitHubController.getGitHubOpenPullRequests(req as Request, res as Response);
    });

    test("should call the GitHubService the right amount of times", async () => {
        expect(gitHubServiceMock.getOpenPullRequests).toHaveBeenCalledTimes(1);
        expect(gitHubServiceMock.getPullRequest).toHaveBeenCalledTimes(2);
    });

    test("should return result and 200 status code", async () => {
        expect(res.status).toHaveBeenCalledWith(200); 
        expect(res.json).toHaveBeenCalled();
    });
});
