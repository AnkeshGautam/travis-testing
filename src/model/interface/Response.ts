export interface IResponse {
    data: unknown,
    metadata: IMetadata
}

interface IMetadata {
    status: string,
    error: string,
    totalCount: number,
    pageNumber: number,
    pageSize: number
}