export type Category = {
    id: string; // API trả về id là string (UUID)
    categoryName: string; // Tên danh mục
    slug: string; // Slug cho URL
    image: string | null; // Hình ảnh, có thể null
    parentId: string | null; // ID danh mục cha, có thể null
    parentName: string | null; // Tên danh mục cha, có thể null
    children: Category[]; // Danh sách danh mục con
    isDeleted: boolean;
    createdBy: string;
    createdOn: string;
    updatedBy: string | null;
    updatedOn: string | null;
    createdbyStr: string;
};
