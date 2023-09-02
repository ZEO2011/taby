// Styles
import "./assets/styles/output.css"
import "./assets/styles/normalize.css"

// Hooks
import React, { useEffect, useRef, useState, useId } from "react"

// components
import FavSite from "./components/FavSite"
import NewFavsiteForm from "./components/NewFavsiteForm"

// Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faXmarkCircle } from "@fortawesome/free-solid-svg-icons"
import { format } from "date-fns"

type sites = { url: string; name: string; saved?: boolean; siteId?: string }

export default function App() {
	const searchBarRef = useRef<HTMLInputElement>(null)
	const [newFavSiteStatus, setNewFavSiteStates] = useState(false)
	const [favSites, setFavSite] = useState<sites[]>([])
	let siteId: string = useId()
	const [time, setTime] = useState(new Date())
	useEffect(() => {
		const intervalId = setInterval(() => {
			setTime(new Date())
		}, 1000)
		return () => {
			clearInterval(intervalId)
		}
	})
	// check if user get into the app for the first time
	useEffect(() => {
		if (localStorage.getItem("saved_websites") === null) {
			localStorage.setItem("saved_websites", JSON.stringify(favSites))
		}
	}, [])
	// set the saved sites
	useEffect(() => {
		// check if the length of the favsites equal 0 and the sved websites length === 0
		if (
			favSites.length === 0 &&
			localStorage.getItem("saved_websites")?.length !== 0
		) {
			// saving the data to the setFavSite state
			const data: sites[] = JSON.parse(
				`${localStorage.getItem("saved_websites")}`,
			).map((el: sites) => {
				el.saved = true
				return el
			})
			setFavSite(data)
		}
	}, [])
	// add new sites to the localStorage
	useEffect(() => {
		const saved: { url: string; name: string }[] = JSON.parse(
			`${localStorage.getItem("saved_websites")}`,
		).filter((el: sites) => el.saved === null)
		// check if the length of the saved websites === 0 if it's you should save the values if not you should save the current value and the value
		if (saved.length === 0)
			return localStorage.setItem(
				"saved_websites",
				JSON.stringify(favSites),
			)
		return localStorage.setItem(
			"saved_websites",
			JSON.stringify([...saved, ...favSites]),
		)
	}, [favSites])
	// search bar handler
	function searchBarHandler(e: React.KeyboardEvent<HTMLInputElement>) {
		if (searchBarRef.current?.value === "") return
		if (e.key === "Enter") {
			window.open(
				`https://www.google.com/search?q=${searchBarRef.current?.value}`,
			)
		}
	}
	return (
		<div className="container flex flex-col justify-center items-center">
			<h1 className="text-white text-9xl">{format(time, "h:mm a")}</h1>
			<div className="search w-[min(50rem,100%)] relative">
				<div className="w-fit bg-white p-3 rounded-lg absolute left-2 !grid place-items-center h-full">
					<img
						src="/imgs/search_engines/google.png"
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
			<div className="fav-sites w-[min(50rem,100%)] h-fit mt-4 flex flex-wrap gap-6 justify-center items-center">
				{favSites.map(
					({ url, name }: { url: string; name: string }) => {
						return (
							<FavSite
								key={crypto.randomUUID()}
								url={url}
								name={name}
								id={siteId}
								delBtnHandler={() => {
									return setFavSite((current) => {
										return current.filter(
											(el) =>
												el.siteId !=
												`${siteId}-${name}`,
										)
									})
								}}
							/>
						)
					},
				)}
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
							setFavSite((current) => {
								return [
									...current,
									{
										name,
										url,
										siteId: `${siteId}-${name}`,
									},
								]
							})
						}}
					/>
				) : null}
			</div>
		</div>
	)
}
