// Hooks
import { useEffect, useState } from "react"

// Libraries
import axios from "axios"

export default function Background() {
	const [value, setValue] = useState<string>()
	// random background
	useEffect(() => {
		axios.get("/data/backgrounds.json").then(
			(res: { data: string[] }) => {
				const random = Math.floor(Math.random() * res.data.length)
				setValue(res.data[random])
			},
		)
	})
	return <img id="background-img" src={value} loading="lazy" />
}
