import MockResponse from '../data/mock-response.json';

const REST_ENDPOINT = process.env.PUNISHMENT_SERVICE_API || 'localhost:10000';
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

export type PunishmentRestServiceRest = {
    totalResults: number;
    results: Punishment[];
};

export const getPunishments = (props: PunishmentHookProps): PunishmentRestServiceRest => {
    const requestUrl = `${REST_ENDPOINT}/allPunishements?pageSize=${props.pageSize}&page=${props.pageIndexRequest}`;
    console.log(requestUrl);
    return { results: MockResponse, totalResults: MockResponse.length };
};
