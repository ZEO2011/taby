// Styles
import "./assets/styles/output.css"
import "./assets/styles/normalize.css"

// Hooks
import React, { useState } from "react"
import FavSite from "./components/FavSite"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faXmarkCircle } from "@fortawesome/free-solid-svg-icons"
import NewFavsiteForm from "./components/NewFavsiteForm"

export default function App() {
	const [searchBarValue, setSearchBarValue] = useState("")
	const [newFavSiteStatus, setNewFavSiteStates] = useState(false)
	const [favSites, setFavSite] = useState<{ url: string; name: string }[]>(
		[],
	)
	function searchBarHandler(e: React.KeyboardEvent<HTMLInputElement>) {
		if (searchBarValue === "") return
		if (e.key === "Enter") {
			window.open(`https://www.google.com/search?q=${searchBarValue}`)
		}
	}
	return (
		<div className="container flex flex-col justify-center items-center">
			<h1 className="text-white text-9xl">hello, ziad</h1>
			<div className="search w-[min(50rem,100%)] relative">
				<div className="w-fit bg-white p-3 rounded-lg absolute left-2 !grid place-items-center h-full">
					<img
						src="/imgs/search_engines/google.png"
						alt="google search engine"
						className="w-12"
					/>
				</div>
				<input
					className="main-input w-full h-20 text-2xl pl-24"
					type="text"
					placeholder="search"
					onKeyUp={(e) => searchBarHandler(e)}
					value={searchBarValue}
					onChange={(e) =>
						setSearchBarValue(e.currentTarget.value)
					}
				/>
			</div>
			<div className="fav-sites w-[min(50rem,100%)] h-fit mt-4 flex flex-wrap gap-6 justify-center items-center">
				{favSites.length !== 0
					? favSites.map(
							({
								url,
								name,
							}: {
								url: string
								name: string
							}) => {
								return (
									<FavSite
										key={crypto.randomUUID()}
										url={url}
										name={name}
									/>
								)
							},
					  )
					: null}
				<button
					onClick={() => setNewFavSiteStates((cur) => !cur)}
					className="site h-[8.5rem] w-36 px-2 py-0.5 cursor-pointer rounded-md transition-all hover:bg-white hover:bg-opacity-10 backdrop-blur-sm"
				>
					<FontAwesomeIcon
						icon={faPlus}
						size="4x"
						className="text-white"
					/>
				</button>
				{newFavSiteStatus ? (
					<NewFavsiteForm
						closeComponent={
							<>
								<div
									className="close absolute -top-2 -right-2 text-4xl text-red-500 cursor-pointer"
									onClick={() =>
										setNewFavSiteStates(false)
									}
								>
									<FontAwesomeIcon
										icon={faXmarkCircle}
									/>
								</div>
							</>
						}
						submitBtnMission={(name: string, url: string) => {
							setNewFavSiteStates(false)
							return setFavSite((current) => {
								return [...current, { name, url }]
							})
						}}
					/>
				) : null}
			</div>
		</div>
	)
}
