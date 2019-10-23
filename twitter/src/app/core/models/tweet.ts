export interface Tweet {
    _id: string;
    reply?: Tweet[];
    content: string;
    posterUser: string;
    createdAt: Date;
    stars: number;
    isOwner?: boolean;
    isStared?: boolean;
    isStaredByMe?: boolean;
    starCount?: number;
}