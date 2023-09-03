import { createPortal } from "react-dom"
import { useRef } from "react"

export default function EditFavSiteForm({
	closeComponent,
	defValues,
	submitBtnMission,
}: {
	closeComponent: React.ReactElement
	defValues: string[] | number[] | readonly string[]
	submitBtnMission: (
		name: string | undefined,
		url: string | undefined,
	) => void
}) {
	const websiteNameRef = useRef<HTMLInputElement>(null)
	const websiteURLRef = useRef<HTMLInputElement>(null)
	document.addEventListener("keyup", (e) => {
		if (e.key === "Enter")
			document.getElementById("submit-editfavsite-form")?.click()
	})
	return createPortal(
		<>
			<div className="message-container z-50 backdrop-blur-md w-[min(50rem,95%)] h-[30rem] shadow-lg relative">
				{closeComponent}
				<div className="w-full h-full flex flex-col mt-12 items-center px-28">
					<h1 className="text-white text-5xl">edit site</h1>
					<h2 className="text-gray-100 text-xl font-semibold my-2 mt-4">
						name
					</h2>
					<input
						autoFocus
						type="text"
						className="w-full text-2xl pl-3 py-2"
						defaultValue={defValues[1]}
						ref={websiteNameRef}
					/>
					<h2 className="text-gray-100 text-xl font-semibold my-2 mt-4">
						website URL
					</h2>
					<input
						type="text"
						className="w-full text-2xl pl-3 py-2"
						defaultValue={defValues[0]}
						ref={websiteURLRef}
					/>
					<input
						onClick={() =>
							submitBtnMission(
								websiteNameRef.current?.value,
								websiteURLRef.current?.value,
							)
						}
						type="submit"
						placeholder="submit"
						id="submit-editfavsite-form"
						className="bg-blue-500 rounded-md p-4 px-6 cursor-pointer mt-6 text-white"
					/>
				</div>
			</div>
		</>,
		document.getElementById("alert-messages") as Element,
	)
}
