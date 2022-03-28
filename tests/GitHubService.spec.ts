import GitHubService from '../src/services/GitHubService';
import ApiService from '../src/services/ApiService';


describe("When using the Github service", () => {
    let gitHubService: GitHubService;
    const MockApiService = <jest.Mock<ApiService>>ApiService;
    let mockApiService = new MockApiService();
    const owner = "danman";
    const repo = "github-api-project";
    const pullNumber = 356;
    let mockApiServiceSpy;

    beforeAll(() => {
        gitHubService = new GitHubService(mockApiService);
        mockApiServiceSpy = jest.spyOn(mockApiService, "get");
    });

    describe("and getOpenPullRequests is called", () => {
        const token = 'bsdf';

        beforeAll(() => {
            process.env.TOKEN = token;
            gitHubService.getOpenPullRequests(owner, repo);
        });

        test("it calls the correct url with parameters", () => {
            expect(mockApiServiceSpy).toHaveBeenCalledWith(`https://api.github.com/repos/${owner}/${repo}/pulls?state=opened`, token)
        });
    });

    describe("and getPullRequest is called", () => {
        const token = null;

        beforeAll(() => {
            process.env.TOKEN = token;
            gitHubService.getOpenPullRequests(owner, repo);
        });

        test("it should call the correct github api url", () => {
            gitHubService.getPullRequest(owner, repo, pullNumber);
            expect(mockApiServiceSpy).toHaveBeenLastCalledWith(`https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}`, token);
        });
    });
});
