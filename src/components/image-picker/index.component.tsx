import React, { useState } from "react";
import { cropCircularImage } from "../../utils/cropImage";
import Compressor from "compressorjs";
import { Button, Modal, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Magnifier from "./magnifier.componet";
import OutputImage from "./output-image.component";
import MagnifierController from "./magnifier-controller.component";
import ImageBase from "./image-base.component";

type ImagePickerProps = {
	minMagnifier: 40;
	maxMagnifier: 200;
	value?: string;
	onChange?: (value: string) => void;
};
const ImagePicker = ({ value, onChange, minMagnifier, maxMagnifier }: ImagePickerProps) => {
	const [openPopup, setOpenPopup] = useState(false);
	const [imageSource, setImageSource] = useState("");
	const [output, setOutput] = useState(value);
	const [showMagnifier, setShowMagnifier] = useState(false);
	const [[imageWidth, imageHeight], setImageSize] = useState([0, 0]);
	const [[positionX, positionY], setXY] = useState([0, 0]);
	const [isPickColor, setIsPickColor] = useState(true);
	const [color, setColor] = useState(value ?? "");
	const [magnifier, setMagnifier] = useState(60);

	const handleFileChange = async (info: any) => {
		const { file, onSuccess } = info;
		new Compressor(file as File, {
			quality: 1,
			maxHeight: 500,
			maxWidth: 500,
			success: async (compressedResult) => {
				const base64 = await getBase64(compressedResult as File);
				setImageSource(base64);
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

	const handleOpenPopup = () => {
		setOpenPopup(!openPopup);
	};

	const getInfoImageFromBase64 = async () => {
		const source = await cropCircularImage(imageSource, positionX, positionY, magnifier, isPickColor, 60);
		setOutput(source);
		onChange?.(source);
		setOpenPopup(false);
	};

	const handleMouseWheel = (event: React.WheelEvent<HTMLImageElement>) => {
		const moveStep = 5;
		const delta = Math.sign(event.deltaY);
		if (delta === 1) {
			setMagnifier((e) => (e - moveStep >= 40 ? e - moveStep : e));
		} else if (delta === -1) {
			setMagnifier((e) => (e + moveStep <= 200 ? e + moveStep : e));
		}
	};

	const magnifierProps = {
		isPickColor,
		imageSource,
		imageHeight,
		imageWidth,
		showMagnifier,
		color,
		positionX,
		positionY,
		size: magnifier,
	};

	const imageBaseProps = {
		imageSource,
		magnifier,
		isPickColor,
		handleMouseWheel,
		handleShowMagnifier: setShowMagnifier,
		setImageSize,
		handlerOutputColor: setColor,
		handlerChangePositionMouse: setXY,
		getInfoImageFromBase64,
		cropCircularImage,
	};

	const magnifierControllerProps = {
		magnifier,
		handlerChangeMagnifier: setMagnifier,
		handlerChangeOptionSelect: setIsPickColor,
		isPickColor,
		maxMagnifier,
		minMagnifier,
		defaultMagnifier: 60,
	};
	return (
		<div>
			<OutputImage output={output} handleOpenPopup={handleOpenPopup} />
			<Modal
				open={openPopup}
				onCancel={() => setOpenPopup(false)}
				onOk={() => {
					setImageSource("");
					onChange?.("");
				}}
				width="fit-content"
				closable={false}
				okText="Reset"
			>
				{imageSource ? (
					<>
						<ImageBase {...imageBaseProps} />
						<Magnifier {...magnifierProps} />
						<MagnifierController {...magnifierControllerProps} />
					</>
				) : (
					<Upload customRequest={handleFileChange} accept="image/png, image/jpeg" maxCount={1}>
						<Button icon={<UploadOutlined />}>Click to Upload</Button>
					</Upload>
				)}
			</Modal>
		</div>
	);
};

export default ImagePicker;
