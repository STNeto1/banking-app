// generated with @7nohe/openapi-react-query-codegen@0.5.1 
import { useQuery, useMutation, UseQueryResult, UseQueryOptions, UseMutationOptions, UseMutationResult } from "@tanstack/react-query";
import { handlers_loginRequest } from "../requests/models/handlers_loginRequest";
import { handlers_createUserRequest } from "../requests/models/handlers_createUserRequest";
import { handlers_createTransferEventRequest } from "../requests/models/handlers_createTransferEventRequest";
import { handlers_createInviteRequest } from "../requests/models/handlers_createInviteRequest";
import { handlers_createEventRequest } from "../requests/models/handlers_createEventRequest";
import { handlers_HealthResponse } from "../requests/models/handlers_HealthResponse";
import { handlers_GenericSuccessResponse } from "../requests/models/handlers_GenericSuccessResponse";
import { handlers_GenericErrorResponse } from "../requests/models/handlers_GenericErrorResponse";
import { handlers_AuthResponse } from "../requests/models/handlers_AuthResponse";
import { core_User } from "../requests/models/core_User";
import { core_InviteStatus } from "../requests/models/core_InviteStatus";
import { core_Invite } from "../requests/models/core_Invite";
import { core_Event } from "../requests/models/core_Event";
import { SystemService } from "../requests/services/SystemService";
import { InviteService } from "../requests/services/InviteService";
import { FriendService } from "../requests/services/FriendService";
import { EventService } from "../requests/services/EventService";
import { AuthService } from "../requests/services/AuthService";
export const useSystemServiceGetHealthKey = "SystemServiceGetHealth";
export const useSystemServiceGetHealth = <TQueryKey extends Array<unknown> = unknown[], TData = Awaited<ReturnType<typeof SystemService.getHealth>>, TError = unknown>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof SystemService.getHealth>>, unknown, Awaited<ReturnType<typeof SystemService.getHealth>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useSystemServiceGetHealthKey, ...(queryKey ?? [])], queryFn: () => SystemService.getHealth(), ...options }) as Omit<UseQueryResult<Awaited<ReturnType<typeof SystemService.getHealth>>, TError>, "data"> & {
    data: TData;
};
export const useInviteServicePostInvitesAccept = <TData = Awaited<ReturnType<typeof InviteService.postInvitesAccept>>, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof InviteService.postInvitesAccept>>, unknown, {
    id: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ id }) => InviteService.postInvitesAccept(id), ...options }) as Omit<UseMutationResult<Awaited<ReturnType<typeof InviteService.postInvitesAccept>>, TError, {
    id: string;
}, TContext>, "data"> & {
    data: TData;
};
export const useInviteServicePostInvitesCancel = <TData = Awaited<ReturnType<typeof InviteService.postInvitesCancel>>, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof InviteService.postInvitesCancel>>, unknown, {
    id: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ id }) => InviteService.postInvitesCancel(id), ...options }) as Omit<UseMutationResult<Awaited<ReturnType<typeof InviteService.postInvitesCancel>>, TError, {
    id: string;
}, TContext>, "data"> & {
    data: TData;
};
export const useInviteServicePostInvitesCreate = <TData = Awaited<ReturnType<typeof InviteService.postInvitesCreate>>, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof InviteService.postInvitesCreate>>, unknown, {
    body: handlers_createInviteRequest;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ body }) => InviteService.postInvitesCreate(body), ...options }) as Omit<UseMutationResult<Awaited<ReturnType<typeof InviteService.postInvitesCreate>>, TError, {
    body: handlers_createInviteRequest;
}, TContext>, "data"> & {
    data: TData;
};
export const useInviteServiceGetInvitesReceivedKey = "InviteServiceGetInvitesReceived";
export const useInviteServiceGetInvitesReceived = <TQueryKey extends Array<unknown> = unknown[], TData = Awaited<ReturnType<typeof InviteService.getInvitesReceived>>, TError = unknown>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof InviteService.getInvitesReceived>>, unknown, Awaited<ReturnType<typeof InviteService.getInvitesReceived>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useInviteServiceGetInvitesReceivedKey, ...(queryKey ?? [])], queryFn: () => InviteService.getInvitesReceived(), ...options }) as Omit<UseQueryResult<Awaited<ReturnType<typeof InviteService.getInvitesReceived>>, TError>, "data"> & {
    data: TData;
};
export const useInviteServicePostInvitesReject = <TData = Awaited<ReturnType<typeof InviteService.postInvitesReject>>, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof InviteService.postInvitesReject>>, unknown, {
    id: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ id }) => InviteService.postInvitesReject(id), ...options }) as Omit<UseMutationResult<Awaited<ReturnType<typeof InviteService.postInvitesReject>>, TError, {
    id: string;
}, TContext>, "data"> & {
    data: TData;
};
export const useInviteServiceGetInvitesSentKey = "InviteServiceGetInvitesSent";
export const useInviteServiceGetInvitesSent = <TQueryKey extends Array<unknown> = unknown[], TData = Awaited<ReturnType<typeof InviteService.getInvitesSent>>, TError = unknown>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof InviteService.getInvitesSent>>, unknown, Awaited<ReturnType<typeof InviteService.getInvitesSent>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useInviteServiceGetInvitesSentKey, ...(queryKey ?? [])], queryFn: () => InviteService.getInvitesSent(), ...options }) as Omit<UseQueryResult<Awaited<ReturnType<typeof InviteService.getInvitesSent>>, TError>, "data"> & {
    data: TData;
};
export const useFriendServiceGetFriendsListKey = "FriendServiceGetFriendsList";
export const useFriendServiceGetFriendsList = <TQueryKey extends Array<unknown> = unknown[], TData = Awaited<ReturnType<typeof FriendService.getFriendsList>>, TError = unknown>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof FriendService.getFriendsList>>, unknown, Awaited<ReturnType<typeof FriendService.getFriendsList>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useFriendServiceGetFriendsListKey, ...(queryKey ?? [])], queryFn: () => FriendService.getFriendsList(), ...options }) as Omit<UseQueryResult<Awaited<ReturnType<typeof FriendService.getFriendsList>>, TError>, "data"> & {
    data: TData;
};
export const useFriendServicePostFriendsRemove = <TData = Awaited<ReturnType<typeof FriendService.postFriendsRemove>>, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof FriendService.postFriendsRemove>>, unknown, {
    id: string;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ id }) => FriendService.postFriendsRemove(id), ...options }) as Omit<UseMutationResult<Awaited<ReturnType<typeof FriendService.postFriendsRemove>>, TError, {
    id: string;
}, TContext>, "data"> & {
    data: TData;
};
export const useEventServicePostEventsDeposit = <TData = Awaited<ReturnType<typeof EventService.postEventsDeposit>>, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof EventService.postEventsDeposit>>, unknown, {
    body: handlers_createEventRequest;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ body }) => EventService.postEventsDeposit(body), ...options }) as Omit<UseMutationResult<Awaited<ReturnType<typeof EventService.postEventsDeposit>>, TError, {
    body: handlers_createEventRequest;
}, TContext>, "data"> & {
    data: TData;
};
export const useEventServiceGetEventsListKey = "EventServiceGetEventsList";
export const useEventServiceGetEventsList = <TQueryKey extends Array<unknown> = unknown[], TData = Awaited<ReturnType<typeof EventService.getEventsList>>, TError = unknown>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof EventService.getEventsList>>, unknown, Awaited<ReturnType<typeof EventService.getEventsList>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useEventServiceGetEventsListKey, ...(queryKey ?? [])], queryFn: () => EventService.getEventsList(), ...options }) as Omit<UseQueryResult<Awaited<ReturnType<typeof EventService.getEventsList>>, TError>, "data"> & {
    data: TData;
};
export const useEventServicePostEventsTransfer = <TData = Awaited<ReturnType<typeof EventService.postEventsTransfer>>, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof EventService.postEventsTransfer>>, unknown, {
    body: handlers_createTransferEventRequest;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ body }) => EventService.postEventsTransfer(body), ...options }) as Omit<UseMutationResult<Awaited<ReturnType<typeof EventService.postEventsTransfer>>, TError, {
    body: handlers_createTransferEventRequest;
}, TContext>, "data"> & {
    data: TData;
};
export const useEventServicePostEventsWithdraw = <TData = Awaited<ReturnType<typeof EventService.postEventsWithdraw>>, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof EventService.postEventsWithdraw>>, unknown, {
    body: handlers_createEventRequest;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ body }) => EventService.postEventsWithdraw(body), ...options }) as Omit<UseMutationResult<Awaited<ReturnType<typeof EventService.postEventsWithdraw>>, TError, {
    body: handlers_createEventRequest;
}, TContext>, "data"> & {
    data: TData;
};
export const useAuthServicePostAuthLogin = <TData = Awaited<ReturnType<typeof AuthService.postAuthLogin>>, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof AuthService.postAuthLogin>>, unknown, {
    body: handlers_loginRequest;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ body }) => AuthService.postAuthLogin(body), ...options }) as Omit<UseMutationResult<Awaited<ReturnType<typeof AuthService.postAuthLogin>>, TError, {
    body: handlers_loginRequest;
}, TContext>, "data"> & {
    data: TData;
};
export const useAuthServiceGetAuthProfileKey = "AuthServiceGetAuthProfile";
export const useAuthServiceGetAuthProfile = <TQueryKey extends Array<unknown> = unknown[], TData = Awaited<ReturnType<typeof AuthService.getAuthProfile>>, TError = unknown>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof AuthService.getAuthProfile>>, unknown, Awaited<ReturnType<typeof AuthService.getAuthProfile>>, unknown[]>, "queryKey" | "queryFn" | "initialData">) => useQuery({ queryKey: [useAuthServiceGetAuthProfileKey, ...(queryKey ?? [])], queryFn: () => AuthService.getAuthProfile(), ...options }) as Omit<UseQueryResult<Awaited<ReturnType<typeof AuthService.getAuthProfile>>, TError>, "data"> & {
    data: TData;
};
export const useAuthServicePostAuthRegister = <TData = Awaited<ReturnType<typeof AuthService.postAuthRegister>>, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof AuthService.postAuthRegister>>, unknown, {
    body: handlers_createUserRequest;
}, unknown>, "mutationFn">) => useMutation({ mutationFn: ({ body }) => AuthService.postAuthRegister(body), ...options }) as Omit<UseMutationResult<Awaited<ReturnType<typeof AuthService.postAuthRegister>>, TError, {
    body: handlers_createUserRequest;
}, TContext>, "data"> & {
    data: TData;
};
