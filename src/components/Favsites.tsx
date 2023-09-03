// Compoenents
import FavSite from "./FavSite"
import EditFavSiteForm from "./EditFavSiteForm"

// Types
import type { sites } from "../App"
import type { Dispatch, SetStateAction } from "react"

// Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faXmarkCircle } from "@fortawesome/free-solid-svg-icons"
import NewFavsiteForm from "./NewFavsiteForm"

export default function Favsites({
	siteId,
	favSites,
	setFavSite,
	setEditFavSiteStatus,
	NameDefaultValue,
	setNameDefaultValue,
	URLDefaultValue,
	setURLDefaultValue,
	setCurrentFavSiteId,
	setNewFavSiteStates,
	editFavSiteStatus,
	submitEditFormHandler,
	newFavSiteStatus,
}: {
	siteId: string
	favSites: sites[]
	setFavSite: Dispatch<SetStateAction<sites[]>>
	setEditFavSiteStatus: Dispatch<SetStateAction<boolean>>
	editFavSiteStatus: boolean
	setNameDefaultValue: Dispatch<SetStateAction<string>>
	NameDefaultValue: string
	setURLDefaultValue: Dispatch<SetStateAction<string>>
	URLDefaultValue: string
	setCurrentFavSiteId: Dispatch<SetStateAction<string>>
	setNewFavSiteStates: Dispatch<SetStateAction<boolean>>
	submitEditFormHandler: (
		name: string | undefined,
		url: string | undefined,
	) => void
	newFavSiteStatus: boolean
}) {
	return (
		<>
			<div className="fav-sites w-[min(50rem,100%)] h-fit mt-4 flex flex-wrap gap-6 justify-center items-center">
				{favSites.map(
					({ url, name }: { url: string; name: string }) => {
						return (
							<FavSite
								key={crypto.randomUUID()}
								url={url}
								name={name}
								id={`${siteId}-${name}`}
								delBtnHandler={(id: string) => {
									return setFavSite((current) => {
										return current.filter(
											(el) => {
												return (
													el.siteId != id
												)
											},
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
						submitBtnMission={(
							name: string | undefined,
							url: string | undefined,
						) => {
							setNewFavSiteStates(false)
							setFavSite((current: sites[]) => {
								const values: {
									name: string
									url: string
								} = {
									name:
										name !== undefined
											? name
											: "",
									url: url !== undefined ? url : "",
								}
								return [
									...current,
									{
										...values,
										siteId: `${siteId}-${name}`,
									},
								]
							})
						}}
					/>
				) : null}
			</div>
		</>
	)
}
