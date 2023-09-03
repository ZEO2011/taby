// Styles
import "./assets/styles/output.css"
import "./assets/styles/normalize.css"

// Hooks
import React, { useEffect, useRef, useState, useId } from "react"

// components
import FavSite from "./components/FavSite"
import NewFavsiteForm from "./components/NewFavsiteForm"
import Clock from "./components/Clock"

// Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faXmarkCircle } from "@fortawesome/free-solid-svg-icons"
import EditFavSiteForm from "./components/EditFavSiteForm"

type sites = { url: string; name: string; saved?: boolean; siteId?: string }

export default function App() {
	const searchBarRef = useRef<HTMLInputElement>(null)
	const [newFavSiteStatus, setNewFavSiteStates] = useState(false)
	const [editFavSiteStatus, setEditFavSiteStatus] = useState(false)
	const [favSites, setFavSite] = useState<sites[]>([])
	const [NameDefaultValue, setNameDefaultValue] = useState<string>("")
	const [URLDefaultValue, setURLDefaultValue] = useState<string>("")
	const [currentFavSiteId, setCurrentFavSiteId] = useState<string>("")
	let siteId: string = useId()
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
		// ! don't edit the dependency array!!!!!!
	}, [favSites, editFavSiteStatus])
	// search bar handler
	function searchBarHandler(e: React.KeyboardEvent<HTMLInputElement>) {
		if (searchBarRef.current?.value === "") return
		if (e.key === "Enter") {
			window.open(
				`https://www.google.com/search?q=${searchBarRef.current?.value}`,
			)
		}
	}
	// get default values of the site that user wanna edit
	useEffect(() => {
		favSites.map((site) => {
			if (site.siteId === `${siteId}-${site.name}`)
				setNameDefaultValue(site.name)
		})
		favSites.map((site) => {
			if (site.siteId === `${siteId}-${site.name}`)
				setURLDefaultValue(site.url)
		})
	})
	// submit edit form handler
	function submitEditFormHandler(
		name: string | undefined,
		url: string | undefined,
	) {
		if (name === "" || url === "")
			return alert("please fill in the fields")
		else {
			setEditFavSiteStatus(false)
			return setFavSite((current: sites[]) => {
				current.forEach((site: sites) => {
					if (site.siteId === currentFavSiteId) {
						site.name = name !== undefined ? name : site.name
						site.siteId = `${`:${
							site.siteId.slice(1).split(":")[0]
						}:`}-${site.name}`
						site.url = url !== undefined ? url : site.url
					} else {
						return site
					}
				})
				return current
			})
		}
	}
	return (
		<div className="container flex flex-col justify-center items-center">
			<Clock />
			<div className="search w-[min(50rem,100%)] relative">
				<button className="w-fit bg-white p-3 rounded-lg absolute left-2 top-0 !grid place-items-center h-20">
					<img
						src={`/imgs/search_engines/google.png`}
						alt="google search engine"
						className="w-12"
					/>
				</button>
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
								id={`${siteId}-${name}`}
								delBtnHandler={() => {
									return setFavSite((current) => {
										return current.filter(
											(el) =>
												el.siteId !=
												`${siteId}-${el.name}`,
										)
									})
								}}
								editBtnHandler={(id: string) => {
									setEditFavSiteStatus(true)
									return favSites.map((site) => {
										if (site.siteId === id)
											setNameDefaultValue(
												site.name,
											)
										if (site.siteId === id)
											setURLDefaultValue(
												site.url,
											)
										if (site.siteId === id)
											setCurrentFavSiteId(
												site.siteId,
											)
									})
								}}
							/>
						)
					},
				)}
				{favSites.length >= 8 ? null : (
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
				)}
				{editFavSiteStatus ? (
					<>
						<EditFavSiteForm
							closeComponent={
								<div
									className="close absolute -top-2 -right-2 text-4xl text-red-500 cursor-pointer"
									onClick={() =>
										setEditFavSiteStatus(false)
									}
								>
									<FontAwesomeIcon
										icon={faXmarkCircle}
									/>
								</div>
							}
							defValues={[
								URLDefaultValue,
								NameDefaultValue,
							]}
							submitBtnMission={(
								name: string | undefined,
								url: string | undefined,
							) => {
								submitEditFormHandler(name, url)
							}}
						/>
					</>
				) : null}
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
