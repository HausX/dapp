import { StreamCard } from "../StreamCard"
import { STREAM_LABELS } from "../event-factory/data"
import { STREAMS } from "./data"

export const EventMarket = () => {
	return (
		<div className="flex flex-col space-y-6">
			{STREAM_LABELS.map((label, idx) => (
				<div key={idx} className="space-y-4">
					<h2 className="text-xl font-bold capitalize">{label.title}</h2>
					<div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
						{STREAMS.filter(stream => stream.category === label.title).map((stream, idx) => (
							<StreamCard key={idx} {...stream} />
						))}
					</div>
				</div>
			))}
		</div>
	)
}