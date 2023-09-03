export default function Loading() {
	return (
		<>
			<div className="loading w-full h-full fixed inset-0 bg-gray-50 grid place-items-center z-50">
				<object data="/imgs/logo.svg" width={150} height={150} />
			</div>
		</>
	)
}
