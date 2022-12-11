import { isDate, set } from "date-fns";
import { useRouter } from "next/router";

/**
 * Get date from URL params or returns provided date as a fallback
 * @param date
 * @returns Date
 */
export function useDateFromRouter(date: Date) {
	const router = useRouter();
	const query = router.query;

	let initialDate: Date = date;

	if (Array.isArray(query.slug) && query.slug.length === 3) {
		const slugDate = new Date(query.slug.toString());

		if (isDate(slugDate)) {
			initialDate = slugDate;
		}
	}

	return initialDate;
}
