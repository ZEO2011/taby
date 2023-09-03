// Types
import type { RefObject } from "react"

export default function Search({
	searchBarRef,
	searchBarHandler,
}: {
	searchBarRef: RefObject<HTMLInputElement>
	searchBarHandler: (e: React.KeyboardEvent) => void
}) {
	return (
		<>
			<div className="search w-[min(50rem,100%)] relative">
				<div className="w-fit bg-white p-3 rounded-lg absolute left-2 top-0 !grid place-items-center h-20">
					<img
						src={`/imgs/search_engines/google.png`}
						alt="google search engine"
						className="w-12"
					/>
				</div>
				<input
					className="main-input w-full h-20 text-2xl pl-[5.5rem] pr-8"
					type="text"
					placeholder="search"
					onKeyUp={(e) => searchBarHandler(e)}
					ref={searchBarRef}
				/>
			</div>
		</>
	)
}
