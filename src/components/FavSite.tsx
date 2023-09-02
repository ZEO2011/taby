// libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"
import { useRef } from "react"

// types
import type { MouseEventHandler } from "react"

export default function FavSite({
	url,
	name,
	id,
	delBtnHandler = () => alert("delete button function is not defined"),
}: {
	url: string
	name: string
	id: string
	delBtnHandler?: MouseEventHandler<HTMLButtonElement>
}) {
	const edits = useRef<HTMLDivElement>(null)
	function siteHandler() {
		window.open(`https://${url}`)
	}
	const regex: RegExp = /(http|https)/gi
	const usedURL: string = regex.test(url) ? url : `https://${url}`
	// delete button handler
	return (
		<div className="site-parent relative w-fit h-fit" id={id}>
			<button
				onClick={() => edits.current?.classList.toggle("hidden")}
				className="edit hidden z-10 absolute right-0 w-8 h-8 rounded-[50%] place-items-center text-white transition-all hover:bg-white hover:bg-opacity-25
					"
			>
				<FontAwesomeIcon icon={faEllipsisVertical} />
			</button>
			<div
				ref={edits}
				className="banel hidden absolute top-9 z-50 w-24 -right-7 h-fit py-1 flex-col gap-4 bg-slate-400"
			>
				<button
					className="text-white w-full h-10 bg-slate-500"
					onClick={delBtnHandler}
				>
					delete
				</button>
			</div>
			<div
				className="site normal-case relative w-36 px-2 py-0.5 cursor-pointer rounded-md h-fit transition-all hover:bg-white hover:bg-opacity-10 backdrop-blur-sm"
				onClick={siteHandler}
				title={`open ${name}`}
			>
				<div className="img-container p-2 grid place-items-center">
					<img
						src={`https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${usedURL}&size=50`}
						className="w-20"
					/>
				</div>
				<div className="name text-white text-xl w-full h-full text-center mt-2">
					<h2>{name}</h2>
				</div>
			</div>
		</div>
	)
}
