import { isDate } from "date-fns";
import { useRouter } from "next/router";

export function useInitialDate(date: Date) {
	const router = useRouter();
	const query = router.query;

	let initialDate: Date = date;

	if (Array.isArray(query.slug)) {
		const slugDate = new Date(query.slug.toString());

		if (isDate(slugDate)) {
			initialDate = slugDate;
		}
	}

	return {
		date: initialDate,
	}
}
