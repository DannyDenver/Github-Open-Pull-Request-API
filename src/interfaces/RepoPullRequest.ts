export interface RepoPullRequest {
    id: number;
    number: number;
    title: string;
    user: {
        login: string;
    }
}