/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { core_Event } from '../models/core_Event';
import type { handlers_createEventRequest } from '../models/handlers_createEventRequest';
import type { handlers_createTransferEventRequest } from '../models/handlers_createTransferEventRequest';
import type { handlers_GenericSuccessResponse } from '../models/handlers_GenericSuccessResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class EventService {

    /**
     * Create deposit for the user
     * @param body Event params
     * @returns handlers_GenericSuccessResponse Created
     * @throws ApiError
     */
    public static postEventsDeposit(
        body: handlers_createEventRequest,
    ): CancelablePromise<handlers_GenericSuccessResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/events/deposit',
            body: body,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * List user events
     * @returns core_Event OK
     * @throws ApiError
     */
    public static getEventsList(): CancelablePromise<Array<core_Event>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/events/list',
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Create transfer for the user
     * @param body Event params
     * @returns handlers_GenericSuccessResponse Created
     * @throws ApiError
     */
    public static postEventsTransfer(
        body: handlers_createTransferEventRequest,
    ): CancelablePromise<handlers_GenericSuccessResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/events/transfer',
            body: body,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Create withdraw for the user
     * @param body Event params
     * @returns handlers_GenericSuccessResponse Created
     * @throws ApiError
     */
    public static postEventsWithdraw(
        body: handlers_createEventRequest,
    ): CancelablePromise<handlers_GenericSuccessResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/events/withdraw',
            body: body,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

}
