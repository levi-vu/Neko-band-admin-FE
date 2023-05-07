import { Upload, message } from "antd";
import storage from "../../utils/firebase";
import { UploadTaskSnapshot, deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { RcFile, UploadFile } from "antd/es/upload";
import { Dispatch, SetStateAction } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Language } from "../../assets/language/vietnam";

type UploadImageType = {
	UrlsHandler: Dispatch<SetStateAction<string[]>>;
};

function UploadImage({ UrlsHandler }: UploadImageType) {
	const handleUpload = async (options: any) => {
		const { file, onSuccess, onError, onProgress } = options;
		try {
			const storageRef = ref(storage, `images/${file.uid}`);
			const uploadTask = uploadBytesResumable(storageRef, file);
			uploadTask.on(
				"state_changed",
				(snapShot: UploadTaskSnapshot) => {
					const progress = (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
					onProgress({ percent: progress }, file);
				},
				(error) => {
					onError(new Error(Language.uploadFileFailed.replace('{0}', file.name )));
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((url) => {
						UrlsHandler((preValue) => [...preValue, url]);
						message.success(Language.uploadFileSucceeded.replace('{0}', file.name ));
						onSuccess();
					});
				}
			);
		} catch (error) {
			onError(error);
		}
	};

	const handleFileDelete = async (file: RcFile) => {
		try {
			const storageRef = ref(storage, `images/${file.uid}`);
			getDownloadURL(storageRef).then((refUrl) => UrlsHandler((urls) => urls.filter((url) => url != refUrl)));
			deleteObject(storageRef).then(() => {
				message.warning(Language.deleteFileSucceeded.replace('{0}', file.name ));
			});
		} catch (error) {
			message.error(Language.deleteFileFailed.replace('{0}', file.name ));
		}
	};

	return (
		<Upload
			customRequest={handleUpload}
			onRemove={(file: UploadFile) => {
				handleFileDelete(file.originFileObj as RcFile);
			}}
			multiple
			listType="picture-card"
			accept="image/png, image/jpeg"
		>
			<div>
				<AiOutlinePlus />
				<div style={{ marginTop: 8 }}>Upload</div>
			</div>
		</Upload>
	);
}

export default UploadImage;
