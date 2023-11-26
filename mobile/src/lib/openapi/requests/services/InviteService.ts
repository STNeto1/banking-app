/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { core_Invite } from '../models/core_Invite';
import type { handlers_createInviteRequest } from '../models/handlers_createInviteRequest';
import type { handlers_GenericSuccessResponse } from '../models/handlers_GenericSuccessResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class InviteService {

    /**
     * Accept an user received invite
     * @param id Invite ID
     * @returns void
     * @throws ApiError
     */
    public static postInvitesAccept(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/invites/accept/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Cancel an user sent invite
     * @param id Invite ID
     * @returns void
     * @throws ApiError
     */
    public static postInvitesCancel(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/invites/cancel/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Create invite to a user
     * @param body Invite params
     * @returns handlers_GenericSuccessResponse Created
     * @throws ApiError
     */
    public static postInvitesCreate(
        body: handlers_createInviteRequest,
    ): CancelablePromise<handlers_GenericSuccessResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/invites/create',
            body: body,
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * List user received invites
     * @returns core_Invite OK
     * @throws ApiError
     */
    public static getInvitesReceived(): CancelablePromise<Array<core_Invite>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/invites/received',
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Reject an user received invite
     * @param id Invite ID
     * @returns void
     * @throws ApiError
     */
    public static postInvitesReject(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/invites/reject/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * List user sent invites
     * @returns core_Invite OK
     * @throws ApiError
     */
    public static getInvitesSent(): CancelablePromise<Array<core_Invite>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/invites/sent',
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

}
