import GitHubService from '../src/services/GitHubService';
import ApiService from '../src/services/ApiService';


describe("When using the Github service", () => {
    let gitHubService: GitHubService;
    const MockApiService = <jest.Mock<ApiService>>ApiService;
    let mockApiService = new MockApiService();
    const owner = "danman";
    const repo = "github-api-project";
    const pullNumber = 356;

    beforeAll(() => {
        gitHubService = new GitHubService(mockApiService);
    });

    describe("and getOpenPullRequests is called", () => {
        const token = 'bsdf';
        let mockApiServiceSpy;

        beforeAll(() => {
            process.env.TOKEN = token;
            jest.clearAllMocks();
            mockApiServiceSpy = jest.spyOn(mockApiService, "get");
        });

        test("it calls the correct url with parameters", () => {
            gitHubService.getOpenPullRequests(owner, repo);

            expect(mockApiServiceSpy).toHaveBeenCalledWith(`https://api.github.com/repos/${owner}/${repo}/pulls?state=opened`, token)
        });
    });

    describe("and getPullRequest is called", () => {
        const token = '43vfd';
        let mockApiServiceSpy;

        beforeAll(() => {
            process.env.TOKEN = token;
            jest.clearAllMocks();
            mockApiServiceSpy = jest.spyOn(mockApiService, "get");
        });

        test("it should call the correct github api url", () => {
            gitHubService.getPullRequest(owner, repo, pullNumber);
            expect(mockApiServiceSpy).toHaveBeenCalledWith(`https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}`, token);
        });
    });
});
