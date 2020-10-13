export interface Repository {
    id: number;
    name: string;
    full_name: string;
    description: string;
    updated_at: string;
    pushed_at: string;
    stargazers_count: number;
    watchers_count: number;
    forks_count: number;
    language: string;
    hidden: boolean;
    categories: Array<string>;
    license: {
        name: string;
    };
}
