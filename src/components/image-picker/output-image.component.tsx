type outputImageProps = {
	output?: string;
	handleOpenPopup: () => void;
};
function OutputImage({ output, handleOpenPopup }: outputImageProps) {
	return (
		<div
			style={{
				width: "60px",
				height: "60px",
				borderRadius: "50%",
				border: "1px solid #ccc",
			}}
			onClick={handleOpenPopup}
		>
			{output?.charAt(0) === "#" ? (
				<div style={{ backgroundColor: output, borderRadius: "50%", width: "100%", height: "100%" }} />
			) : (
				<div style={{ backgroundImage: `url(${output})`, width: "100%", height: "100%", borderRadius: "50%" }} />
			)}
		</div>
	);
}

export default OutputImage;
