import { createPortal } from "react-dom"
import { useState } from "react"

export default function NewFavsiteForm({
	closeComponent,
	submitBtnMission,
}: {
	closeComponent: React.ReactElement
	submitBtnMission: Function
}) {
	const [websiteName, setWebsiteName] = useState("")
	const [websiteURL, setWebsiteURL] = useState("")
	function submitBtnHandler() {
		if (websiteName === "" || websiteURL === "")
			return alert("please fill in the fields")
		submitBtnMission(websiteName, websiteURL)
	}
	document.addEventListener("keyup", (e) => {
		if (e.key === "Enter")
			document.getElementById("submit-newfavsite-form")?.click()
	})
	return createPortal(
		<>
			<div className="message-container backdrop-blur-md w-[min(50rem,95%)] h-[30rem] shadow-lg relative">
				{closeComponent}
				<div className="w-full h-full flex flex-col mt-12 items-center px-28">
					<h1 className="text-white text-5xl">new site</h1>
					<h2 className="text-gray-100 text-xl font-semibold my-2 mt-4">
						name
					</h2>
					<input
						autoFocus
						type="text"
						className="w-full text-2xl pl-3 py-2"
						value={websiteName}
						onChange={(e) =>
							setWebsiteName(e.currentTarget.value)
						}
					/>
					<h2 className="text-gray-100 text-xl font-semibold my-2 mt-4">
						website URL
					</h2>
					<input
						type="text"
						className="w-full text-2xl pl-3 py-2"
						value={websiteURL}
						onChange={(e) =>
							setWebsiteURL(e.currentTarget.value)
						}
					/>
					<input
						onClick={submitBtnHandler}
						type="submit"
						placeholder="submit"
						id="submit-newfavsite-form"
						className="bg-blue-500 rounded-md p-4 px-6 cursor-pointer mt-6 text-white"
					/>
				</div>
			</div>
		</>,
		document.getElementById("alert-messages") as Element,
	)
}
