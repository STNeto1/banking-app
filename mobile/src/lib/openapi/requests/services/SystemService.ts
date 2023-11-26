/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { handlers_HealthResponse } from '../models/handlers_HealthResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SystemService {

    /**
     * Show health status
     * @returns handlers_HealthResponse OK
     * @throws ApiError
     */
    public static getHealth(): CancelablePromise<handlers_HealthResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/health',
        });
    }

}
