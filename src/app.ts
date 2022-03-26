import 'reflect-metadata';
import express, { Request, Response } from 'express';
import Container from 'typedi';
import GitHubController from './controllers/GitHubController';

const main = async () => {
    const app = express();
    app.use(express.json());

    const gitHubController = Container.get(GitHubController)

    app.get("/api/v1/repos/:owner/:repo/pulls", (req: Request, res: Response) => gitHubController.getGitHubOpenPullRequests(req,res));
    
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Listening on port ${process.env.PORT || 5000}...`)
    });
}

main().catch(err => {
    console.log(err);
})
