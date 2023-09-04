// lobraries
import { format } from "date-fns"
import { useEffect, useState } from "react"

export default function Clock() {
	const [time, setTime] = useState(new Date())
	useEffect(() => {
		const intervalId = setInterval(() => {
			setTime(new Date())
		}, 1000)
		return () => {
			clearInterval(intervalId)
		}
	})
	return (
		<h1 className="text-white text-9xl z-40 text-center ">
			{format(time, "h:mm a")}
		</h1>
	)
}
