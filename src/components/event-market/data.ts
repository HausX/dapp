import { Stream } from './types';

const getRandomDate = () => {
	const currentDate = new Date();
	const currentMonth = currentDate.getMonth();
	const randomDay = Math.floor(Math.random() * 30) + 1; // Random day between 1 and 30
	const randomHour = Math.floor(Math.random() * 24); // Random hour between 0 and 23
	const randomMinute = Math.floor(Math.random() * 60); // Random minute between 0 and 59
	const randomDate = new Date(currentDate.getFullYear(), currentMonth, randomDay, randomHour, randomMinute);
	return randomDate;
};

const getRandomRanking = () => {
	return `${Math.floor(Math.random() * 1000) + 1} / 1000`; // Random ranking between 1 and 1000
};

const getRandomUsername = () => {
	const fantasyCharacters = [
		'Gandalf',
		'Frodo',
		'Aragorn',
		'Legolas',
		'Gimli',
		'Bilbo',
		'Samwise',
		'Gollum',
		'Gandalf',
		'Frodo',
		'Aragorn',
		'Legolas',
		'Gimli',
		'Bilbo',
		'Samwise',
		'Gollum',
	];
	const randomIndex = Math.floor(Math.random() * fantasyCharacters.length);
	return fantasyCharacters[randomIndex];
};

export const STREAMS: Stream[] = [
	{
		category: 'standup comedy',
		title: 'Laugh Out Loud',
		description: 'Get ready to laugh out loud with hilarious standup comedy performances!',
		labels: ['standup comedy'],
		date: getRandomDate(),
		ranking: getRandomRanking(),
		username: getRandomUsername(),
	},
	{
		category: 'visual art',
		title: 'Artistic Visions',
		description: 'Experience the beauty and creativity of visual art in this captivating stream!',
		labels: ['visual art'],
		date: getRandomDate(),
		ranking: getRandomRanking(),
		username: getRandomUsername(),
	},
	{
		category: 'performance art',
		title: 'Expressive Performances',
		description: 'Witness mesmerizing performances that push the boundaries of art and expression!',
		labels: ['performance art'],
		date: getRandomDate(),
		ranking: getRandomRanking(),
		username: getRandomUsername(),
	},
	{
		category: 'slam poetry',
		title: 'Spoken Word Showcase',
		description: 'Immerse yourself in the power of spoken word poetry in this captivating showcase!',
		labels: ['slam poetry'],
		date: getRandomDate(),
		ranking: getRandomRanking(),
		username: getRandomUsername(),
	},
	{
		category: 'open mic/improv',
		title: 'Unscripted Moments',
		description: 'Expect the unexpected with unscripted moments of comedy and improvisation!',
		labels: ['open mic/improv'],
		date: getRandomDate(),
		ranking: getRandomRanking(),
		username: getRandomUsername(),
	},
	{
		category: 'creative workshop',
		title: 'Creative Exploration',
		description: 'Join us for a creative workshop where you can explore your artistic talents!',
		labels: ['creative workshop'],
		date: getRandomDate(),
		ranking: getRandomRanking(),
		username: getRandomUsername(),
	},
	{
		category: 'standup comedy',
		title: 'Comedy Central',
		description: 'Welcome to Comedy Central, your one-stop destination for hilarious standup comedy!',
		labels: ['standup comedy'],
		date: getRandomDate(),
		ranking: getRandomRanking(),
		username: getRandomUsername(),
	},
	{
		category: 'visual art',
		title: 'Artistic Expressions',
		description: 'Indulge in the beauty of artistic expressions through captivating visual art!',
		labels: ['visual art'],
		date: getRandomDate(),
		ranking: getRandomRanking(),
		username: getRandomUsername(),
	},
	{
		category: 'performance art',
		title: 'Artistic Performances',
		description: 'Experience the magic of artistic performances that will leave you in awe!',
		labels: ['performance art'],
		date: getRandomDate(),
		ranking: getRandomRanking(),
		username: getRandomUsername(),
	},
	{
		category: 'slam poetry',
		title: 'Poetry Slam',
		description: 'Prepare to be moved by powerful poetry performances in this electrifying slam!',
		labels: ['slam poetry'],
		date: getRandomDate(),
		ranking: getRandomRanking(),
		username: getRandomUsername(),
	},
	{
		category: 'open mic/improv',
		title: 'Improv Night',
		description: 'Join us for a night of spontaneous laughter and hilarious improvisation!',
		labels: ['open mic/improv'],
		date: getRandomDate(),
		ranking: getRandomRanking(),
		username: getRandomUsername(),
	},
	{
		category: 'creative workshop',
		title: 'Creative Learning',
		description: 'Expand your creative horizons and learn new skills in this interactive workshop!',
		labels: ['creative workshop'],
		date: getRandomDate(),
		ranking: getRandomRanking(),
		username: getRandomUsername(),
	},
	{
		category: 'standup comedy',
		title: 'Comedy Showcase',
		description: "Don't miss this comedy showcase featuring some of the funniest comedians around!",
		labels: ['standup comedy'],
		date: getRandomDate(),
		ranking: getRandomRanking(),
		username: getRandomUsername(),
	},
	{
		category: 'visual art',
		title: 'Artistic Creations',
		description: 'Discover awe-inspiring artistic creations that will leave you inspired and amazed!',
		labels: ['visual art'],
		date: getRandomDate(),
		ranking: getRandomRanking(),
		username: getRandomUsername(),
	},
	{
		category: 'performance art',
		title: 'Artistic Expressions',
		description: 'Immerse yourself in the world of artistic expressions through captivating performances!',
		labels: ['performance art'],
		date: getRandomDate(),
		ranking: getRandomRanking(),
		username: getRandomUsername(),
	},
	{
		category: 'slam poetry',
		title: 'Spoken Word Poetry',
		description: 'Experience the power of spoken word poetry in this soul-stirring stream!',
		labels: ['slam poetry'],
		date: getRandomDate(),
		ranking: getRandomRanking(),
		username: getRandomUsername(),
	},
	{
		category: 'open mic/improv',
		title: 'Unscripted Comedy',
		description: 'Get ready for a night of unscripted comedy that will have you laughing non-stop!',
		labels: ['open mic/improv'],
		date: getRandomDate(),
		ranking: getRandomRanking(),
		username: getRandomUsername(),
	},
	{
		category: 'creative workshop',
		title: 'Creative Workshop',
		description: 'Join us for a creative workshop where you can unleash your imagination and creativity!',
		labels: ['creative workshop'],
		date: getRandomDate(),
		ranking: getRandomRanking(),
		username: getRandomUsername(),
	},
];
