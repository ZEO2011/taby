export default function FavSite({ url, name }: { url: string; name: string }) {
	function siteHandler() {
		window.open(`https://${url}`)
	}
	const regex: RegExp = /(http|https)/gi
	const usedURL: string = regex.test(url) ? url : `http://${url}`
	let favSiteImg: string
	return (
		<>
			<div
				className="site normal-case w-36 px-2 py-0.5 cursor-pointer rounded-md h-fit transition-all hover:bg-white hover:bg-opacity-10 backdrop-blur-sm"
				onClick={siteHandler}
				title={`open ${name}`}
			>
				<div className="img-container p-2 grid place-items-center">
					<img
						src={`https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${usedURL}&size=50`}
						className="rounded-[50%] w-20"
					/>
				</div>
				<div className="name text-white text-xl w-full h-full text-center mt-2">
					<h2>{name}</h2>
				</div>
			</div>
		</>
	)
}
