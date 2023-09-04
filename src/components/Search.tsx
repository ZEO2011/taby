// Types
import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import { ReactNode } from "react"

// Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faYoutube } from "@fortawesome/free-brands-svg-icons"

// Hooks
import { useState } from "react"

// search bar type
type searchEnginesType = {
	google: {
		url: string
		icon: ReactNode
	}
	youtube: {
		url: string
		icon: ReactNode
	}
}

export default function Search() {
	const [searchValue, setSearchValue] = useState<string>()
	const [searchEnginesStatus, setSearchEnginesStatus] = useState<boolean>()
	const [currentSearchEngine, setCurrentSearchEngine] = useState<
		"google" | "youtube"
	>("google")
	/*
	TODO: Make a toggle list that you can choose a search engine ( google, youtube, etc.. )
	you can make an array of search Engines (type: object ) each search engine has img & search URL
	*/
	let searchEngines: searchEnginesType = {
		google: {
			url: `https://www.google.com/search?q=${searchValue}`,
			icon: (
				<FontAwesomeIcon
					icon={faGoogle}
					size="3x"
					className="text-[#0099e5]"
				/>
			),
		},
		youtube: {
			url: `https://www.youtube.com/results?search_query=${searchValue}`,
			icon: (
				<FontAwesomeIcon
					icon={faYoutube}
					size="3x"
					className="text-[#ff0000]"
				/>
			),
		},
	}
	// search bar handler
	function searchBarHandler(e: React.KeyboardEvent): void {
		if (searchValue === "") return
		if (e.key === "Enter") {
			window.open(searchEngines[currentSearchEngine].url)
		}
	}
	function searchEngineChangerHandler() {
		setSearchEnginesStatus((c) => !c)
	}
	function changeSearchEngineHandler() {
		setCurrentSearchEngine((c) => (c === "google" ? "youtube" : "google"))
	}
	return (
		<>
			<div className="search w-[min(50rem,100%)] relative">
				<button
					className="w-fit bg-white p-3 rounded-lg relative left-2 top-20 !grid place-items-center h-20"
					onClick={searchEngineChangerHandler}
				>
					{searchEngines[currentSearchEngine].icon}
					{searchEnginesStatus ? (
						<div className="toggle-menu left-1/2 -translate-x-1/2 top-[4.4rem] grid absolute z-50 w-24 -right-7 h-fit py-1 flex-col divide-y-2 bg-slate-400">
							<button
								className="text-white w-full h-10 bg-slate-500"
								onClick={changeSearchEngineHandler}
							>
								{currentSearchEngine === "youtube"
									? "google"
									: "youtube"}
							</button>
						</div>
					) : null}
				</button>
				<input
					className="main-input w-full h-20 text-2xl pl-[5.5rem] pr-8"
					type="text"
					placeholder="search"
					onKeyUp={(e) => searchBarHandler(e)}
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
				/>
			</div>
		</>
	)
}
