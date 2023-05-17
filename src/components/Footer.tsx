import { Link } from "react-router-dom";
export default function Footer() {
	return (
		<footer className="bottom-0 w-full bg-neutral-200 text-center dark:bg-neutral-700 lg:text-left">
			<div className="p-4 text-center text-neutral-700 dark:text-neutral-200">
				<p>© {new Date().getFullYear()} Copyright</p>
				<Link
					className="flex items-center justify-center font-bold text-neutral-800 dark:text-neutral-400"
					to="/"
				>
					<img src="/logo2.png" className="h-13 w-9 mr-2" />
					Mountaineer
				</Link>
			</div>
		</footer>
	);
}
