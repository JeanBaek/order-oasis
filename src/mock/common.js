const product_coffee = [
  {
    categoryId: "orderOasis.coffee",
    name: "아메리카노",
    price: 1500,
    option: [
      {
        name: "연하게",
      },
      {
        name: "2샷",
        price: 500,
      },
    ],
  },
  {
    categoryId: "orderOasis.coffee",
    name: "헤이즐넛 아메리카노",
    price: 3200,
    option: [
      {
        name: "2샷",
        price: 500,
      },
    ],
  },
  {
    categoryId: "orderOasis.coffee",
    name: "허니 아메리카노",
    price: 2000,
    option: [
      {
        name: "2샷",
        price: 500,
      },
    ],
  },
  {
    categoryId: "orderOasis.coffee",
    name: "아바닐라빈라떼",
    price: 1800,
  },
  {
    categoryId: "orderOasis.coffee",
    name: "아바닐라빈더치라떼",
    price: 1800,
  },
  {
    categoryId: "orderOasis.coffee",
    name: "에스프레소",
    price: 1800,
  },
  {
    categoryId: "orderOasis.coffee",
    name: "에스프레소 마끼아또",
    price: 1800,
  },
];

const product_milktea = [
  {
    categoryId: "orderOasis.milktea",
    name: "얼그레이 밀크티",
    price: 3000,
    option: [
      {
        name: "두유로 변경",
      },
      {
        name: "2샷",
        price: 500,
      },
    ],
  },
  {
    categoryId: "orderOasis.milktea",
    name: "얼그레이 버블티",
    price: 3500,
    option: [
      {
        name: "2샷",
        price: 500,
      },
      {
        name: "버블 추가",
        price: 1000,
      },
      {
        name: "두유로 변경",
      },
    ],
  },
  {
    categoryId: "orderOasis.milktea",
    name: "딸기라떼",
    price: 4500,
  },
  {
    categoryId: "orderOasis.milktea",
    name: "초코라떼",
    price: 3500,
  },
  {
    categoryId: "orderOasis.milktea",
    name: "녹차라떼",
    price: 3500,
  },
  {
    categoryId: "orderOasis.milktea",
    name: "흑임자라떼",
    price: 3500,
    option: [
      {
        name: "두유로 변경",
      },
    ],
  },
];

const product_juice = [
  {
    categoryId: "orderOasis.juice",
    name: "수박쥬스",
    price: 4000,
  },
  {
    categoryId: "orderOasis.juice",
    name: "딸기쥬스",
    price: 3500,
    option: [
      {
        name: "딸기 2배",
        price: 1000,
      },
    ],
  },
  {
    categoryId: "orderOasis.juice",
    name: "망고쥬스",
    price: 4500,
  },
  {
    categoryId: "orderOasis.juice",
    name: "복숭아쥬스",
    price: 3500,
  },
];

const product_desert = [
  {
    categoryId: "orderOasis.dessert",
    name: "딸기 마카롱",
    price: 2000,
  },
  {
    categoryId: "orderOasis.dessert",
    name: "초코 마카롱",
    price: 2000,
  },
  {
    categoryId: "orderOasis.dessert",
    name: "초코칩 쿠키",
    price: 1500,
  },
  {
    categoryId: "orderOasis.dessert",
    name: "아몬드 쿠키",
    price: 1500,
  },
];

export const orderOasisCategories = [
  {
    id: "orderOasis.coffee",
    name: "Coffee",
  },
  {
    id: "orderOasis.milktea",
    name: "Milk Tea",
  },
  {
    id: "orderOasis.juice",
    name: "Juice",
  },
  {
    id: "orderOasis.dessert",
    name: "Dessert",
  },
];

export const orderOasisProducts = [
  ...product_coffee,
  ...product_milktea,
  ...product_juice,
  ...product_desert,
];

export const orderOasisCoupons = [
  {
    id: "coupon_1",
    type: "amount",
    name: "금액 할인",
    price: 3000,
  },
  {
    id: "coupon_2",
    type: "rate",
    name: "비율 할인",
    price: 10,
  },
  {
    id: "coupon_3",
    type: "rate",
    name: "음료 테이크아웃 할인",
    price: 10,
    categoryIds: ["orderOasis.coffee", "orderOasis.milktea", "orderOasis.juice"],
  },
  {
    id: "coupon_4",
    type: "rate",
    name: "[18시~]푸드 마감 세일",
    price: 30,
    categoryIds: ["orderOasis.dessert"],
  },
];
