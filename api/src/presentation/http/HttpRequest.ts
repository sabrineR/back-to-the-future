export interface SearchQuery {
    limit: number;
    offset: number;
    sortBy: string;
    sortOrder: string;
    filter: any;
}

export interface HttpRequestDto {
    user?: any;
    body?: any;
    path?: any;
    params?: any;
    queryString?: {
        filter?: string;
        sortLabel?: string;
    };
    method: string;
    q?: SearchQuery;
    headers?: any;
}
