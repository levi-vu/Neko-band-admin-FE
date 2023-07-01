type ImageBaseProps = {
	imageSource: string;
	magnifier: number;
	isPickColor: boolean;
	handleMouseWheel: (event: React.WheelEvent<HTMLImageElement>) => void;
	handleShowMagnifier: (e: boolean) => void;
	setImageSize: (size: [number, number]) => void;
	handlerOutputColor: (e: string) => void;
	handlerChangePositionMouse: (e: [number, number]) => void;
	getInfoImageFromBase64: () => void;
	cropCircularImage: (imageData: string, x: number, y: number, size: number, getColor: boolean, outputSize: number) => Promise<string>;
};

function ImageBase({
	imageSource,
	isPickColor,
	magnifier,
	handleMouseWheel,
	handleShowMagnifier,
	setImageSize,
	handlerOutputColor,
	handlerChangePositionMouse,
	getInfoImageFromBase64,
	cropCircularImage,
}: ImageBaseProps) {
	return (
		<img
			style={{ maxWidth: "500px" }}
			onWheel={(e) => (!isPickColor ? handleMouseWheel(e) : () => {})}
			src={imageSource}
			onMouseEnter={() => handleShowMagnifier(true)}
			onLoad={(e) => {
				const elem = e.currentTarget;
				const { width, height } = elem.getBoundingClientRect();
				setImageSize([width, height]);
			}}
			onMouseLeave={() => handleShowMagnifier(false)}
			onMouseMove={async (e) => {
				const elem = e.currentTarget;
				const { top, left } = elem.getBoundingClientRect();

				const x = e.pageX - left - window.scrollX;
				const y = e.pageY - top - window.scrollY;
				handlerChangePositionMouse([x, y]);
				if (isPickColor) {
					handlerOutputColor(await cropCircularImage(imageSource, x, y, magnifier, isPickColor, 60));
				}
			}}
			onClick={getInfoImageFromBase64}
		/>
	);
}

export default ImageBase;
