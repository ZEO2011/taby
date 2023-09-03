// Styles
import "./assets/styles/output.css"
import "./assets/styles/normalize.css"

// Hooks
import React, { useEffect, useRef, useState, useId } from "react"

// components
import Clock from "./components/Clock"

// Libraries
import Search from "./components/Search"
import Favsites from "./components/Favsites"

export type sites = {
	url: string
	name: string
	saved?: boolean
	siteId?: string
}

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
	function searchBarHandler(e: React.KeyboardEvent) {
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
			<Search
				searchBarRef={searchBarRef}
				searchBarHandler={searchBarHandler}
			/>
			<Favsites
				siteId={siteId}
				favSites={favSites}
				setFavSite={setFavSite}
				setEditFavSiteStatus={setEditFavSiteStatus}
				setNameDefaultValue={setNameDefaultValue}
				setURLDefaultValue={setURLDefaultValue}
				setCurrentFavSiteId={setCurrentFavSiteId}
				NameDefaultValue={NameDefaultValue}
				URLDefaultValue={URLDefaultValue}
				setNewFavSiteStates={setNewFavSiteStates}
				editFavSiteStatus={editFavSiteStatus}
				submitEditFormHandler={submitEditFormHandler}
				newFavSiteStatus={newFavSiteStatus}
			/>
		</div>
	)
}
