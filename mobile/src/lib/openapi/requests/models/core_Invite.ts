/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { core_InviteStatus } from './core_InviteStatus';
import type { core_User } from './core_User';

export type core_Invite = {
    created_at?: string;
    id?: string;
    status?: core_InviteStatus;
    user?: core_User;
};

