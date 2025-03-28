// Imports
import e from 'express';
import {
    IResponse,
    ISimpleResponse,
    ITokenResponse,
    IUnknownResponse,
    ICustomResponse,
    IDataResponse
} from '../interfaces/responseInterface';
import {MessagesStatus} from "./messagesUtils";

export default class ResponseUtils {

    /**
     * Generates a correct HTTP response based on the provided details.
     *
     * @param {Object} obj - The input parameters.
     * @param {e.Response} obj.res - The response object from the Express framework.
     * @param {string} obj.detail - Additional details to include in the response.
     * @return {e.Response} The HTTP response with a 200 status code and JSON-formatted response body.
     */
    public correctResponse({res, detail}: ISimpleResponse): e.Response {
        const response: IResponse = {
            code: 200,
            message: MessagesStatus.OK,
            detail: detail
        }
        return res.status(response.code).json(response);
    }

    /**
     * Corrects the data response by setting the response code, message, and data object.
     *
     * @param {Object} params - The method parameters.
     * @param {e.Response} params.res - The Express response object to send the response.
     * @param {Object} params.data - The data to be included in the response.
     * @return {e.Response} Returns the Express response object with the modified response.
     */
    public correctDataResponse({res, data}: IDataResponse): e.Response {
        const response: IResponse = {
            code: 200,
            message: MessagesStatus.OK,
            data: data
        }
        return res.status(response.code).json(response);
    }

    /**
     * Sends an error response with a 500 status code.
     *
     * @param {Object} params - The parameters object.
     * @param {e.Response} params.res - The response object.
     * @param {string} params.detail - Detailed error message.
     * @return {e.Response} The error response.
     */
    public errorResponse({res, detail}: IUnknownResponse): e.Response {
        const response: IResponse = {
            code: 500,
            message: MessagesStatus.ERROR,
            detail: detail
        }
        return res.status(response.code).json(response);
    }

    public forbiddenResponse({res, detail}: IUnknownResponse): e.Response {
        const response: IResponse = {
            code: 403,
            message: MessagesStatus.FORBIDDEN,
            detail: detail
        }
        return res.status(response.code).json(response);
    }

    /**
     * Corrects and formats the token response to be sent back to the client.
     *
     * @param {Object} responseParams - The response parameters.
     * @param {e.Response} responseParams.res - The Express response object.
     * @param {string} responseParams.detail - The detail message to be included in the response.
     * @param {string} responseParams.token - The token to be included in the response.
     * @returns {e.Response} The formatted response with status code and JSON payload.
     */
    public correctTokenResponse({res, detail, token}: ITokenResponse): e.Response {
        const response: IResponse = {
            code: 200,
            message: MessagesStatus.OK,
            detail: detail,
            token: token
        }
        return res.status(response.code).json(response);
    }

    /**
     * Generates and sends an invalidated response with a 422 status code.
     *
     * @param {Object} param0 - The input parameters.
     * @param {e.Response} param0.res - The response object.
     * @param {string} param0.detail - The detail message for the response.
     * @return {e.Response} The HTTP response with a 422 status and the invalidated message.
     */
    public invalidatedResponse({res, detail}: ISimpleResponse): e.Response {
        const response: IResponse = {
            code: 422,
            message: MessagesStatus.INVALIDATED,
            detail: detail
        }
        return res.status(response.code).json(response);
    }

    /**
     * Constructs and sends a 401 Unauthorized JSON response.
     *
     * @param {Object} params - The parameters for the response.
     * @param {express.Response} params.res - The Express response object.
     * @param {string} [params.detail] - Optional detailed message about the unauthorized status.
     * @param {string} [params.message] - Optional custom message for the unauthorized status; defaults to standard unauthorized message if not provided.
     * @return {express.Response} The Express response object with a 401 status and JSON body.
     */
    public unauthorizedResponse({res, detail, message}: ISimpleResponse): e.Response {
        const response: IResponse = {
            code: 401,
            message: message ?? MessagesStatus.UNAUTHORIZED,
            detail: detail
        }
        return res.status(response.code).json(response);
    }

    /**
     * Generates a 404 Not Found HTTP response with a custom message and detail.
     *
     * @param {Object} params - The parameters for the response.
     * @param {Object} params.res - The Express response object.
     * @param {string} params.detail - Additional detail for the not found response.
     * @return {e.Response} - The HTTP response with a 404 status code and a JSON payload.
     */
    public notFoundResponse({res, detail}: ISimpleResponse): e.Response {
        const response: IResponse = {
            code: 404,
            message: MessagesStatus.NOTFOUND,
            detail: detail
        }
        return res.status(response.code).json(response);
    }

    /**
     * Constructs a custom response and sends it to the client.
     *
     * @param {Object} param The parameter object containing response options.
     * @param {e.Response} param.res The Express response object.
     * @param {number} param.code The HTTP status code to be sent with the response.
     * @param {string} param.message The message to be included in the response.
     * @param {string} param.detail Additional details to be included in the response.
     * @param {string} [param.token] Optional token to be included in the response.
     * @param {string} [param.token2] Optional second token to be included in the response.
     * @param {any} param.anyId Arbitrary ID to be included in the response.
     * @param {string} param.anyString Arbitrary string to be included in the response.
     * @return {e.Response} The formatted response with appropriate status and JSON payload.
     */
    public customResponse({res, code, message, detail, token, token2, anyId, anyString}: ICustomResponse): e.Response {
        const response: IResponse = {
            code: code,
            message: message,
            detail: detail,
            anyId: anyId,
            anyString: anyString,
            token: token ? token : null,
            token2: token2 ? token2 : null
        }
        return res.status(response.code).json(response);
    }
}