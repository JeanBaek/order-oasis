import { orderOasisProducts } from "../../common";

const productsData = {
	uri: "/products",
	handleResponse: () => {
		const data = orderOasisProducts;

		return {
			data,
		};
	},
};

export default productsData;
