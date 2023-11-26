/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { core_User } from '../models/core_User';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FriendService {

    /**
     * List user friends
     * @returns core_User OK
     * @throws ApiError
     */
    public static getFriendsList(): CancelablePromise<Array<core_User>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/friends/list',
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Remove friend
     * @param id Friend ID
     * @returns void
     * @throws ApiError
     */
    public static postFriendsRemove(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/friends/remove/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }

}
