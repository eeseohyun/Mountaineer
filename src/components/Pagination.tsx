export default function Pagination({ total, limit, page, setPage }) {
	const numPages = Math.ceil(total / limit);
	return (
		<div className="inline-flex -space-x-px">
			<button
				onClick={() => setPage(page - 1)}
				disabled={page === 1}
				className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
			>
				&lt;
			</button>

			{Array(numPages)
				.fill()
				.map((_, i) => {
					return (
						<button
							className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
							key={i + 1}
							onClick={() => setPage(i + 1)}
							aria-current={page === i + 1 ? "page" : null}
						>
							{i + 1}
						</button>
					);
				})}

			<button
				onClick={() => setPage(page + 1)}
				disabled={page === numPages}
				className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
			>
				&gt;
			</button>
		</div>
	);
}
