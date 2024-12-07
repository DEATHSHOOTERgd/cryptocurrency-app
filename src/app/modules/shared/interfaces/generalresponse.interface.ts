export interface IGeneralResponse<T> {
    code: number;
    message: string;
    data:T;
}