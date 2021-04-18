const storageName = "cart";

export const updateCartStorage = (value: unknown): void => {
	return localStorage.setItem(storageName, JSON.stringify(value));
};

export const getCartStorage = (): unknown => {
	return JSON.parse(localStorage.getItem(storageName) as string);
};

export const clearCartStorage = (): void => {
	return localStorage.removeItem(storageName);
};