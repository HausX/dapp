export const STREAM_LABELS = [
	{ id: 'standup-comedy', title: 'standup comedy' },
	{ id: 'visual-art', title: 'visual art' },
	{ id: 'performance-art', title: 'performance art' },
	{ id: 'slam-poetry', title: 'slam poetry' },
	{ id: 'open-mic-improv', title: 'open mic/improv' },
	{ id: 'creative-workshop', title: 'creative workshop' },
];
export const SALE_TYPE = [
	{ id: 'tips', title: 'cumulative tips' },
	{ id: 'auction', title: 'blind auction' },
	{ id: 'quadratic', title: 'quadratic tipping' },
];

export const RESERVE_PRICE = [
	{ id: '20', title: '20 matic' },
	{ id: '50', title: '50 matic' },
	{ id: '100', title: '100 matic' },
];

export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const checkFileType = (files: FileList) => {
	if (files[0]?.name) {
		const fileType = files[0].name.split('.').pop() as string;
		if (ACCEPTED_IMAGE_TYPES.includes(fileType)) return true;
	}
	return false;
};
export const ACCEPTED_IMAGE_TYPES = ['jpeg', 'jpg', 'png', 'webp'];
