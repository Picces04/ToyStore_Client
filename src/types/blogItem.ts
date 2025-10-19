export type BlogItem = {
    id: string;
    image: string;
    title: string;
    content: string;
    createdBy: string;
    createdOn: string;
    slug: string;
    approvedBy: string | null;
    approvedByName: string | null;
    isApproved: boolean;
    approvedOn: string | null;
    isDeleted: boolean;
    createdbyStr: string;
};
