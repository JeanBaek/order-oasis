import { orderOasisCategories } from "../../common";

const categoriesData = {
	uri: "/categories",
	handleResponse: () => {
		const data = orderOasisCategories;

		return {
			data,
		};
	},
};

export default categoriesData;
