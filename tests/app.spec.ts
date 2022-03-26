// const request = require('supertest');
// import axios from 'axios';
// require('dotenv').config()
// const MockAdapter = require('axios-mock-adapter');

// const mockAxios = new MockAdapter(axios);

// import { app } from '../src/app';

// describe("When fetching open pull requests", () => {
//     const owner = "jashkenas";
//     const repo = "underscore";

//     describe("and API call is successful", () => {
//         const openPullRequests = [
//             {
//                 id: 1,
//                 number: 2,
//                 title:  "Bug Fix",
//                 user: {
//                     "login": "danman"
//                 }
//             },
//             {
//                 id: 2,
//                 number: 33,
//                 title:  "Second Bug Fix",
//                 user: {
//                     login: "George"
//                     }
//             }
//         ];

//         const pull22 = {commits: 3};        
//         const pull33 = {commits: 2};
//         const headers = process.env.TOKEN && {
//             Authorization: `token ${process.env.TOKEN}`
//         }

//         beforeEach(async () =>  {
//             mockAxios.reset();
//             mockAxios.onGet(`https://api.github.com/repos/${owner}/${repo}/pulls?state=opened`).reply(200, openPullRequests)
//                 .onGet(`https://api.github.com/repos/${owner}/${repo}/pulls/2`).reply(200,  pull22)
//                 .onGet(`https://api.github.com/repos/${owner}/${repo}/pulls/33`).reply(200,  pull33);
//         });

//         test("it should call github api the correct amount of times.", async () => {
//             let axiosGetSpy = jest.spyOn(axios, 'get');
//             await request(app).get(`/api/v1/repos/${owner}/${repo}/pulls`);
//             expect(axiosGetSpy).toHaveBeenCalledTimes(3);

//         });

//         test("it should call the github api at the right url.", async () => {
//             let axiosGetSpy = jest.spyOn(axios, 'get');
//             await request(app).get(`/api/v1/repos/${owner}/${repo}/pulls`);
//             expect(axiosGetSpy).toHaveBeenCalledWith(`https://api.github.com/repos/${owner}/${repo}/pulls?state=opened`, {  headers })
//             expect(axiosGetSpy).toHaveBeenCalledWith(`https://api.github.com/repos/${owner}/${repo}/pulls/2`, {  headers })
//             expect(axiosGetSpy).toHaveBeenCalledWith(`https://api.github.com/repos/${owner}/${repo}/pulls/33`, {  headers })
//         });

//         test("It should respond with 200 on GET request", async () => {
//             const response = await request(app).get(`/api/v1/repos/${owner}/${repo}/pulls`);
//             expect(response.statusCode).toBe(200);
//         });
//     });

//     describe("and endpoint can't be found,", () => {
//         test(" it should respond 404", async () => {
//             const response = await request(app).get(`/api/v1/repos/${owner}/${repo}`);
//             expect(response.statusCode).toBe(404);
//         });
//     })
// });
