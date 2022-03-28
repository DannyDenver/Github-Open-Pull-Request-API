import ApiService from "../src/services/ApiService";
import axios from "axios";
import { PullRequest } from "../src/interfaces/PullRequest";

jest.mock("axios");

describe("When using the Api Service ", () => {
    const url = `https://api.github.com/repos/jashkenas/underscore/pulls/33`;
    const token = "abec542c";
    const pullRequest: PullRequest = {
        commits: 22
    };
    let apiService: ApiService;
    let result;

    beforeAll(async () => {
        const mock = jest.spyOn(axios, 'get');
        mock.mockReturnValueOnce(new Promise((resolve) => resolve({data: pullRequest})));

        apiService = new ApiService();
        result = await apiService.get(url, token);
    });

    describe("and the request is successful", () => {
        test("it should use the url", () => {
            expect(axios.get).toHaveBeenCalledWith(url);
        });

        test("it should add the authorization header", () => {
            expect(axios.defaults.headers.common['Authorization']).toBe(`token ${token}`);
        });

        test("it should return the result", () => {
            expect(result).toBe(pullRequest);
        });
    });
});
