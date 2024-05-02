

export type CategoryDto = {
    id: string;
    name: string;
};

export type ProductDto = {
    categoryId: string;
    name: string;
    price: number;
    option?: Array<ProductOptionDto>;
};

export type ProductOptionDto = {
    name: string;
    price?: number;
};

export type CouponDto = {
    id: string;
    type: "amount" | "rate";
    name: string;
    price: number;
    categoryIds?: ProductDto["categoryId"][]; // dto 없을 경우, 전체 카테고리 적용
};