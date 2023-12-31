// Styles
import "./assets/styles/output.css"
import "./assets/styles/normalize.css"

// Hooks
import { useEffect, useState, useId } from "react"

// components
import Clock from "./components/Clock"
import Loading from "./components/Loading"

// Libraries
import Search from "./components/Search"
import Favsites from "./components/Favsites"
import axios from "axios"
import Quote from "./components/Quote"

export type sites = {
	url: string
	name: string
	saved?: boolean
	siteId?: string
}

export default function App() {
	const [newFavSiteStatus, setNewFavSiteStates] = useState(false)
	const [editFavSiteStatus, setEditFavSiteStatus] = useState(false)
	const [favSites, setFavSite] = useState<sites[]>([])
	const [NameDefaultValue, setNameDefaultValue] = useState<string>("")
	const [URLDefaultValue, setURLDefaultValue] = useState<string>("")
	const [currentFavSiteId, setCurrentFavSiteId] = useState<string>("")
	let siteId: string = useId()
	const [loading, setLoading] = useState(true)
	const [randomBgValue, setRandomBgValue] = useState<string>()
	// random background
	useEffect(() => {
		axios.get("/data/backgrounds.json").then(
			(res: { data: string[] }) => {
				const random = Math.floor(Math.random() * res.data.length)
				setRandomBgValue(res.data[random])
			},
		)
	}, [])
	// loading the background
	function handleLoading() {
		setLoading(false)
	}
	useEffect(() => {
		window.addEventListener("load", handleLoading)
		return () => window.removeEventListener("load", handleLoading)
	}, [])
	return (
		<div className="container flex flex-col justify-center items-center">
			<img id="background-img" src={randomBgValue} />
			{loading ? <Loading /> : null}
			<Clock />
			<Search />
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
				newFavSiteStatus={newFavSiteStatus}
				currentFavSiteId={currentFavSiteId}
			/>
			<Quote />
		</div>
	)
}
