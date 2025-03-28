import {Response} from 'express';

export interface IResponse {
    message: string;
    detail?: any;
    code: number;
    data?: any;
    token?: string;
    token2?: string;
    anyId?: string;
    anyString?: string;
}

export interface ISimpleResponse {
    res: Response;
    detail: string;
    message?: string | null;
}

export interface IDataResponse {
    res: Response;
    data: any;
}


export interface IUnknownResponse {
    res: Response;
    detail: string;
}

export interface ITokenResponse {
    res: Response;
    detail: string;
    token: any;
}

export interface ICustomResponse {
    res: Response,
    code: number,
    message: string,
    detail: string,
    token?: any,
    token2?: any,
    anyId?: string
    anyString?: string
}