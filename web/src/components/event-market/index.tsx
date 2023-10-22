import { StreamCard } from "../StreamCard"
import { STREAM_LABELS } from "../event-factory/data"
import { STREAMS } from "./data"

export const EventMarket = () => {
	return (
		<div className="flex flex-col space-y-6">
			{STREAM_LABELS.map((label, idx) => (
				<div key={idx} className="space-y-4">
					<h2 className="font-bold capitalize">{label.title}</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{STREAMS.filter(stream => stream.category === label.title).map((stream, idx) => (
							<StreamCard key={idx} {...stream} />
						))}
					</div>
				</div>
			))}
		</div>
	)
}