import { Modal, Upload } from "antd";
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import { AiOutlinePlus } from "react-icons/ai";
import { useRef, useState } from "react";
import Compressor from "compressorjs";
import { FormItemType } from "../../models/types/form-item.type";
import { flushSync } from "react-dom";
import { Image } from "../../models/interfaces/image";
import uniqueId from "lodash/uniqueId";

function UploadImage({ value = [], onChange, preFix }: FormItemType<Image[]> & { preFix?: string }) {
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	const [previewTitle, setPreviewTitle] = useState("");
	const images = useRef<Image[]>(value);

	const handlePreview = async (file: UploadFile) => {
		if (!file.url) {
			file.preview = await getBase64(file.originFileObj as RcFile);
		}

		setPreviewImage(file.url ?? (file.preview as string));
		setPreviewOpen(true);
		setPreviewTitle(file.name);
	};

	const handleFileChange = (info: any) => {
		const { file, onSuccess } = info;
		new Compressor(file as File, {
			maxWidth: 900,
			maxHeight: 1333,
			success: async (compressedResult) => {
				const source = await getBase64(compressedResult as File);
				const image: Image = {
					imageId: 0,
					imageName: `${preFix}-${file.name.replaceAll(" ", "")}`,
					source,
					url: "",
					thumbnailUrl: "",
				};
				flushSync(() => {
					images.current = [...images.current, image];
				});
				onSuccess();
			},
			error(err) {
				console.log(err.message);
			},
		});
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
		const newList = value.filter((v) => v.imageName !== file.name);
		images.current = newList;
		onChange?.(newList);
	};

	// B/c upload multiple file is asynchronous so we cant upload data form correctly.
	// Use onchange when all file uploaded to add file is solution
	const handleUploadChange = ({ fileList }: UploadChangeParam<UploadFile<any>>) => {
		const isAllUploaded = fileList.every((file) => file.status === "done");
		if (isAllUploaded) {
			onChange?.(images.current);
		}
	};
	return (
		<>
			<Upload
				showUploadList={{ showDownloadIcon: false }}
				customRequest={handleFileChange}
				onChange={handleUploadChange}
				onRemove={handleFileDelete}
				listType="picture-card"
				accept="image/png, image/jpeg"
				defaultFileList={images.current.map(
					(image) =>
						({ url: image.source ?? image.url, thumbUrl: image.thumbnailUrl, name: image.imageName, status: "done", uid: uniqueId() } as UploadFile)
				)}
				onPreview={handlePreview}
				multiple
			>
				<>
					<AiOutlinePlus />
					Upload
				</>
			</Upload>
			<Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
				<img alt="example" style={{ width: "100%" }} src={previewImage} />
			</Modal>
		</>
	);
}

export default UploadImage;
