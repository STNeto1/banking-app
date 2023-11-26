/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { core_User } from "../models/core_User";
import type { handlers_AuthResponse } from "../models/handlers_AuthResponse";
import type { handlers_createUserRequest } from "../models/handlers_createUserRequest";
import type { handlers_loginRequest } from "../models/handlers_loginRequest";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class AuthService {
	/**
	 * Authenticate user
	 * @param body User credentials
	 * @returns handlers_AuthResponse Created
	 * @throws ApiError
	 */
	public static postAuthLogin(
		body: handlers_loginRequest,
	): CancelablePromise<handlers_AuthResponse> {
		return __request(OpenAPI, {
			method: "POST",
			url: "/auth/login",
			body: body,
			errors: {
				400: `Bad Request`,
				500: `Internal Server Error`,
			},
		});
	}

	/**
	 * User profile
	 * @returns core_User OK
	 * @throws ApiError
	 */
	public static getAuthProfile(token?: string): CancelablePromise<core_User> {
		return __request(OpenAPI, {
			method: "GET",
			url: "/auth/profile",
			headers: {
				Authorization: token ?? "",
			},
			errors: {
				400: `Bad Request`,
				401: `Unauthorized`,
				500: `Internal Server Error`,
			},
		});
	}

	/**
	 * Create user
	 * @param body User credentials
	 * @returns handlers_AuthResponse Created
	 * @throws ApiError
	 */
	public static postAuthRegister(
		body: handlers_createUserRequest,
	): CancelablePromise<handlers_AuthResponse> {
		return __request(OpenAPI, {
			method: "POST",
			url: "/auth/register",
			body: body,
			errors: {
				400: `Bad Request`,
				500: `Internal Server Error`,
			},
		});
	}
}
