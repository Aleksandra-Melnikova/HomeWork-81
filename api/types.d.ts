export interface LinkType {
    id: string;
    originalUrl: string;
    shortUrl: string;
}

export type LinkWithoutId = Omit<LinkType , 'id'>
