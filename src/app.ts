import express, { Request, Response } from 'express';
import OpenPullRequest from './models'
import axios, { AxiosResponse } from 'axios';
require('dotenv').config()

export const app = express();
app.use(express.json());

const headers = process.env.TOKEN && {
    Authorization: `token ${process.env.TOKEN}`
}

axios.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

app.get("/api/v1/repos/:owner/:repo/pulls", (req: Request, res: Response) => {
    axios.get(`https://api.github.com/repos/${req.params.owner}/${req.params.repo}/pulls?state=opened`, {  headers })
        .then((pullRequests: AxiosResponse) => pullRequests.data)
        .then((pullRequests: any[]) => {
            const requests = pullRequests
                                .map(pull => axios
                                                .get(`https://api.github.com/repos/${req.params.owner}/${req.params.repo}/pulls/${pull.number}`,
                                                    { headers }));
            axios
                .all(requests)
                .then(axios.spread((...data) => {
                    res.status(200).json(data.map((d:any, i:number) => 
                        new OpenPullRequest(
                            +pullRequests[i].id,
                            +pullRequests[i].number,
                            pullRequests[i].title,
                            pullRequests[i].user.login,
                            +d.data.commits
                        )
                    ));
                }))
                .catch((error: Error) => {
                    res.status(500).send(`Error: ${error.message}. Calls to github may need an authorization token.`);
                });;
        })
        .catch((error: Error) => {
            res.status(500).send(`Error: ${error.message}. Calls to github may need an authorization token.`);
        });
});

module.exports.app = app;
