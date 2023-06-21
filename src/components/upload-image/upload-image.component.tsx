import { Modal, Upload, message } from "antd";
import storage from "../../utils/firebase";
import { UploadTaskSnapshot, deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import { AiOutlinePlus } from "react-icons/ai";
import { Language } from "../../assets/language/vietnam";
import { useEffect, useState } from "react";
import { Image } from "../../models/interfaces/create-product.type";

type UploadImageType = {
	setImage: (url: string, name: string) => void;
	removeImage: (url: string, name: string) => void;
	images: Image[];
};

function UploadImage({ setImage, removeImage, images }: UploadImageType) {
	const defaultFiles = images.map((image) => ({ url: image.base64, name: image.name } as UploadFile));
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	const [previewTitle, setPreviewTitle] = useState("");

	// const handleUpload = async (options: any) => {
	// 	const { file, onSuccess, onError, onProgress } = options;
	// 	try {
	// 		const storageRef = ref(storage, `images/${file.uid}`);
	// 		const uploadTask = uploadBytesResumable(storageRef, file);
	// 		uploadTask.on(
	// 			"state_changed",
	// 			(snapShot: UploadTaskSnapshot) => {
	// 				const progress = (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
	// 				onProgress({ percent: progress }, file);
	// 			},
	// 			(error) => {
	// 				onError(new Error(Language.uploadFileFailed.replace("{0}", file.name)));
	// 			},
	// 			() => {
	// 				getDownloadURL(uploadTask.snapshot.ref).then((url) => {
	// 					setImage(url);
	// 					message.success(Language.uploadFileSucceeded.replace("{0}", file.name));
	// 					onSuccess();
	// 				});
	// 			}
	// 		);
	// 	} catch (error) {
	// 		onError(error);
	// 	}
	// };

	const handlePreview = async (file: UploadFile) => {
		if (!file.url) {
			file.preview = await getBase64(file.originFileObj as RcFile);
		}

		setPreviewImage(file.url ?? (file.preview as string));
		setPreviewOpen(true);
		setPreviewTitle(file.name);
	};

	const handleFileChange = async (info: any) => {
		const { file, onSuccess } = info;

		const base64 = await getBase64(file as File);
		setImage(base64, file.name);
		onSuccess();
	};

	const getBase64 = (file: File): Promise<string> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = (error) => reject(error);
		});
	};

	const handleFileDelete = async (file: UploadFile) => {
		if (file.url) {
			removeImage(file.url, file.name);
		} else {
			const base64 = await getBase64(file.originFileObj as File);
			removeImage(base64, file.name);
		}
	};

	return (
		<>
			<Upload
				showUploadList={{ showDownloadIcon: false }}
				customRequest={handleFileChange}
				onRemove={handleFileDelete}
				listType="picture-card"
				accept="image/png, image/jpeg"
				defaultFileList={[...defaultFiles]}
				onPreview={handlePreview}
				multiple
			>
				<AiOutlinePlus />
				Upload
			</Upload>
			<Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
				<img alt="example" style={{ width: "100%" }} src={previewImage} />
			</Modal>
		</>
	);
}

export default UploadImage;
