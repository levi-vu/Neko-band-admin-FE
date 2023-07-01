type MagnifierProps = {
	isPickColor: boolean;
	imageSource: string;
	imageHeight: number;
	imageWidth: number;
	showMagnifier: boolean;
	color: string;
	positionX: number;
	positionY: number;
	size: number;
};
function Magnifier(props: MagnifierProps) {
	return props.isPickColor ? (
		<div
			style={{
				display: props.showMagnifier ? "" : "none",
				position: "absolute",
				borderRadius: "50%",
				pointerEvents: "none",
				height: `${props.size}px`,
				width: `${props.size}px`,
				top: `${props.positionY - props.size}px`,
				left: `${props.positionX - props.size / 2}px`,
				border: "1px solid lightgray",
				backgroundColor: props.color,
			}}
		/>
	) : (
		<div
			style={{
				display: props.showMagnifier ? "" : "none",
				position: "absolute",
				borderRadius: "50%",
				pointerEvents: "none",
				height: `${props.size}px`,
				width: `${props.size}px`,
				top: `${props.positionY - props.size}px`,
				left: `${props.positionX - props.size / 2}px`,
				border: "1px solid lightgray",
				backgroundColor: "white",
				backgroundImage: `url(${props.imageSource})`,
				backgroundRepeat: "no-repeat",
				backgroundSize: `${props.imageWidth}px ${props.imageHeight}px`,
				backgroundPositionX: `${-props.positionX + props.size / 2}px`,
				backgroundPositionY: `${-props.positionY + props.size / 2}px`,
			}}
		/>
	);
}

export default Magnifier;
