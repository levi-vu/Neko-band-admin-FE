import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { Image } from "../../models/interfaces/image";
import storage from "../../utils/firebase";

const UploadMultiImageToFirebase = async (images: Image[], uid: string) => {
	const files = images.map((i) => base64toFile(i.source, i.imageName, "image/jpeg"));
	const names = images.map((i) => i.imageName);
	let fileUploaded: Image[] = [];

	const task = files.map((file) => {
		return new Promise<Image>(async (resolve, reject) => {
			try {
				const storageRef = ref(storage, `images/${file.name}-${uid}`);
				const uploadTask = await uploadBytes(storageRef, file);
				getDownloadURL(uploadTask.ref).then((downloadURL) => {
					resolve({ source: downloadURL, imageName: file.name } as Image);
				});
			} catch (error) {
				reject(console.log(error));
			}
		});
		// const storageRef = ref(storage, `images/${file.name}-${uid}`);
		// const uploadTask = uploadBytes(storageRef, file);
		// uploadTask.on(
		// 	"state_changed",
		// 	() => {},
		// 	(error) => {
		// 		console.log(error);
		// 	},
		// 	async () =>
		// 		await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
		// 			fileUploaded.push({ source: url, imageName: file.name } as Image);
		// 		})
		// );
		// return uploadTask;
	});

	await Promise.all(task)
		.then((files) => {
			files.sort((a, b) => names.indexOf(a.imageName) - names.indexOf(b.imageName));
			fileUploaded = files;
		})
		.catch((err) => {
			console.log(err);
		});
	return fileUploaded;
};

const RemoveFileFromFirebase = async (images: Image[], uid: string) => {
	const storage = getStorage();
	const files = images.filter((image) => image.url !== "");
	const task = files.map((file) => {
		const storageRef = ref(storage, `images/${file.imageName}-${uid}`);
		return deleteObject(storageRef);
	});

	await Promise.all(task).catch((err) => console.log(err));
};

const base64toFile = (base64: string, filename: string, mimeType: string): File => {
	const byteCharacters = window.atob(base64.split(",")[1]);
	const byteArrays: Uint8Array[] = [];

	for (let offset = 0; offset < byteCharacters.length; offset += 512) {
		const slice = byteCharacters.slice(offset, offset + 512);
		const byteNumbers = new Array(slice.length);

		for (let i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i);
		}

		const byteArray = new Uint8Array(byteNumbers);
		byteArrays.push(byteArray);
	}

	const blob = new Blob(byteArrays, { type: mimeType });
	return new File([blob], filename, { type: mimeType });
};

export { UploadMultiImageToFirebase, RemoveFileFromFirebase };
