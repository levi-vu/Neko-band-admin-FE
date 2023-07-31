export function cropCircularImage(imageData: string, x: number, y: number, size: number, getColor: boolean, outputSize: number): Promise<string> {
	return new Promise((resolve, reject) => {
		try {
			const canvas = document.createElement("canvas");
			const context = canvas.getContext("2d");

			const image = new Image();
			image.onload = () => {
				canvas.width = outputSize;
				canvas.height = outputSize;

				if (getColor) {
					context?.drawImage(image, x, y, 1, 1, 0, 0, 1, 1);
					const img_data = context?.getImageData(0, 0, 1, 1).data;
					if (img_data === undefined) return "";
					const R = img_data[0];
					const G = img_data[1];
					const B = img_data[2];
					const hex = rgbToHex(R, G, B);
					resolve("#" + hex);
				} else {
					const radius = outputSize / 2;
					context?.arc(radius, radius, radius, 0, 2 * Math.PI);
					context?.closePath();

					context?.drawImage(image, x - size / 2, y - size / 2, size, size, 0, 0, outputSize, outputSize);

					const croppedImage = canvas.toDataURL();
					resolve(croppedImage);
				}
			};

			image.src = imageData;
		} catch (e) {
			reject(new Error("Failed to load the image."));
		}
	});
}

function rgbToHex(R: number, G: number, B: number) {
	return toHex(R) + toHex(G) + toHex(B);
}

function toHex(value: number) {
	if (isNaN(value)) return "00";
	value = Math.max(0, Math.min(value, 255));
	return "0123456789ABCDEF".charAt((value - (value % 16)) / 16) + "0123456789ABCDEF".charAt(value % 16);
}
