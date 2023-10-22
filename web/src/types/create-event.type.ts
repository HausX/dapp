export type CreateEventArgs = {
	startTimeDelta: number;
	baseTip: BigInt;
	maxTickets: number;
	ticketPrice: BigInt;
	curatorCut: BigInt;
	metadata: string;
};
