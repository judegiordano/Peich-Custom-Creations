declare module "react-gallery-carousel";

declare global {
	interface FileList {
		forEach(callback: (f: File) => void): void;
	}
}