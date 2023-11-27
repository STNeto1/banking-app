export const moneyString = (amount: number | string): string => {
	if (typeof amount === "string") {
		return moneyString(parseFloat(amount));
	}

	return amount.toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
	});
};
