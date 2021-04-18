import { VariantType, useSnackbar } from "notistack";

interface IUseSnack {
	snack: (message: string, variant: VariantType) => () => void
}

export const useSnack = (): IUseSnack => {
	const { enqueueSnackbar } = useSnackbar();

	const snack = (message: string, variant: VariantType) => () => {
		enqueueSnackbar(message, { variant });
	};

	return {
		snack
	};
};
