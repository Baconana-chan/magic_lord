export type Caption = {
	top: string;
	bottom: string;
};

export const captions: Caption[] = [
	{
		top: "We're taking a quick nap",
		bottom: "The lord knows what happened. He's not telling."
	},
	{
		top: 'The site is resting, you are not',
		bottom: 'Scheduled maintenance. Very mysterious.'
	},
	{
		top: 'There used to be a BUY button',
		bottom: 'It knew things only SOME people know about.'
	},
	{
		top: 'Everything is under control',
		bottom: "The control is with the lord. He doesn't share."
	},
	{
		top: 'The server went to think',
		bottom: "It'll be back once it's done with important business."
	},
	{
		top: 'Scheduled unscheduled maintenance',
		bottom: "The lord is already aware. You don't need to be."
	},
	{
		top: "We're almost back",
		bottom: "'Almost' is also a state of mind."
	},
	{
		top: 'This page is on a well-deserved break',
		bottom: "Don't poke it with a stick. He sees everything."
	},
	{
		top: 'Error 503: the lord is meditating',
		bottom: "Try again later. Or don't."
	},
	{
		top: "We're fixing it right now",
		bottom: "The lord's word. Well, almost his word."
	},
	{
		top: 'Top-tier placeholder',
		bottom: 'While the other sites get fixed, enjoy the view.'
	},
	{
		top: 'The data exists somewhere',
		bottom: "The lord knows where. It's classified."
	},
	{
		top: 'Tea break',
		bottom: 'The tea is with the lord. You get this page.'
	},
	{
		top: 'Silence on air',
		bottom: 'But with a crown and a green lantern.'
	}
];

/** Номер дня (UTC) — одинаковый для всех посетителей в течение суток. */
export function dayNumber(date: Date): number {
	return Math.floor(
		Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) / 86_400_000
	);
}

export function captionForDate(date: Date): Caption {
	return captions[dayNumber(date) % captions.length];
}
