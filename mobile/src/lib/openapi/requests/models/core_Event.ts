/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type core_Event = {
    amount?: number;
    created_at?: string;
    description?: string;
    id?: string;
    type?: core_Event.type;
};

export namespace core_Event {

    export enum type {
        DEPOSIT = 'deposit',
        WITHDRAWAL = 'withdrawal',
        TRANSFERENCE_FROM = 'transference_from',
        TRANSFERENCE_TO = 'transference_to',
    }


}

