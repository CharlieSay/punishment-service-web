import MockResponse from '../data/mock-response.json';

export interface Punishment {
    uuid: string;
    username: string;
    expiryDate: string;
    offense: string;
    description: string;
    type: string;
}

export const getPunishments = (): Punishment[] => {
    return MockResponse;
};
