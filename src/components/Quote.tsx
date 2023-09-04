// Hooks
import { useEffect, useState } from "react"

// Libraries
import axios from "axios"

export default function Quote() {
	const [quote, setQuote] = useState<string>()
	useEffect(() => {
		axios.get("https://api.quotable.io/random").then((res) => {
			setQuote(res.data.content)
		})
	}, [])
	return (
		<q className=" text-xl z-10 mx-auto absolute bottom-2 backdrop-blur-3xl text-white w-fit px-5 py-3 rounded-lg">
			{quote}
		</q>
	)
}
