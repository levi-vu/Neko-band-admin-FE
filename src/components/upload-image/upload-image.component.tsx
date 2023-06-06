import { Upload, message } from "antd";
import storage from "../../utils/firebase";
import { UploadTaskSnapshot, deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import { AiOutlinePlus } from "react-icons/ai";
import { Language } from "../../assets/language/vietnam";
import { useEffect, useState } from "react";

type UploadImageType = {
	setImage: (url: string) => void;
	removeImage: (url: string) => void;
	listURl: string[];
};

function UploadImage({ setImage, removeImage, listURl }: UploadImageType) {
	const [defaultFiles, setDefaultFiles] = useState<UploadFile[]>(listURl.map((url) => ({ url } as UploadFile)));
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

	const handleFileChange = async (info: any) => {
		const { file, onSuccess } = info;

		const base64 = await getBase64(file as File);
		setImage(base64);
		onSuccess();
	};

	const getBase64 = (file: File) : Promise<string> =>{
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = (error) => reject(error);
		});
	};

	const handleFileDelete = async (file: UploadFile) => {
		if(file.url) {
			removeImage(file.url);
		} else {
			const base64 = await getBase64(file.originFileObj as File);
			removeImage(base64);
		}
	};

	return (
		<Upload
			showUploadList={{showPreviewIcon: false, showDownloadIcon: false}}
			customRequest={handleFileChange}
			onRemove={handleFileDelete}
			listType="picture-card"
			accept="image/png, image/jpeg"
			defaultFileList={[...defaultFiles]}
		>
			<div>
				<AiOutlinePlus />
				<div style={{ marginTop: 8 }}>Upload</div>
			</div>
		</Upload>
	);
}

export default UploadImage;
