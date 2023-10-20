import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Stream } from "./event-market/types"
import { Badge } from "./ui/badge"
import Identicon from "./Identicon"

export const StreamCard = ({
	category,
	title,
	description,
	labels,
	date,
	ranking,
	username,
}: Stream) => {
	return (
		<Card>
			<CardHeader className="grid grid-cols-1 md:grid-cols-[1fr_110px] items-start justify-between gap-4 space-y-0">
				<div className="space-y-1">
					<CardTitle>{title}</CardTitle>
					<CardDescription>
						{description}
					</CardDescription>
				</div>
				<div className="flex space-x-3 items-center">
					<Identicon username={username} />
					<p className="font-semibold">@{username}</p>
				</div>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="flex space-x-4 text-sm text-muted-foreground">
					{labels.map(label => <Badge key={label}>{label}</Badge>)}
				</div>
				<div className="flex w-full justify-between space-x-4 text-sm text-muted-foreground">
					<p className="font-semibold">{date.toLocaleString('en-US', { month: 'short', day: 'numeric' })} @ {date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', timeZoneName: 'short' })}</p>
					<p className="font-semibold">{ranking}</p>
				</div>
			</CardContent>
		</Card>
	)
}