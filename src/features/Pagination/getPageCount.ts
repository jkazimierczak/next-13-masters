export function getPagesCount(totalItemCount: number, itemsPerPage: number) {
	return Math.ceil(totalItemCount / itemsPerPage);
}
