import { orderOasisCoupons } from "../../common"

const couponsData = {
  uri: "/coupons",
  handleResponse: () => {
    const data = orderOasisCoupons

    return {
      data,
    }
  },
}

export default couponsData
