import { formatISO, isDate, parseISO } from "date-fns";
import { App } from "@/components/App/App";
import { WeekPage } from "@/components/WeekPage/WeekPage";
import type { GetServerSideProps } from "next";

import "@/styles/global.css";

type WeekViewIndexProps = {
	date: string;
	now: string;
};

export default function WeekViewIndex(props: { date: string; now: string }) {
	return (
		<App>
			<WeekPage initialDate={parseISO(props.date)} now={parseISO(props.now)} />
		</App>
	);
}

export const getServerSideProps: GetServerSideProps<WeekViewIndexProps> = async ({ params }) => {
	let initialDate = new Date();

	if (Array.isArray(params?.slug) && params?.slug.length === 3) {
		const slugDate = new Date(params.slug.toString());

		if (isDate(slugDate)) {
			initialDate = slugDate;
		}
	}

	return {
		props: {
			date: formatISO(initialDate),
			now: formatISO(new Date()),
		},
	};
};
