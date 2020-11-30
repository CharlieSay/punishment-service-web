import MockResponse from '../data/mock-response.json';

export interface Punishment {
    uuid: string;
    username: string;
    expiryDate: string;
    offense: string;
    description: string;
    type: string;
}

export type PunishmentHookProps = {
    pageSize: number;
    pageIndexRequest: number;
};

export const getPunishments = (props: PunishmentHookProps): Punishment[] => {
    console.log(props);
    return MockResponse;
};
