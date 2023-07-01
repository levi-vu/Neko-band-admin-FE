import { CreateProductRequest } from "../../../models/interfaces/product/product";
import { RemoveFileFromFirebase, UploadMultiImageToFirebase } from "../../../shared/functions/upload-file-firebase";

const RemoveAllImage = async (request: CreateProductRequest) => {
	for (const color of request.colors) {
		await RemoveFileFromFirebase([...color.images, color.featureImage], request.productCode);
		color.images.forEach((i) => (i.url = ""));
		color.featureImage.url = "";
	}
};

const UploadAllImageOnRequest = async (request: CreateProductRequest) => {
	for (const color of request.colors) {
		color.images = await UploadMultiImageToFirebase(color.images, request.productCode);
		if (!color.featureImage.source.startsWith("#")) {
			color.featureImage = (await UploadMultiImageToFirebase([color.featureImage], request.productCode))[0];
		}
	}
};

export { RemoveAllImage, UploadAllImageOnRequest };
