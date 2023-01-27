import Script from "next/script";

export function App({ children }: React.PropsWithChildren) {
	return (
		<>
			<Script id="color-mode">
				{`((d) => {
					try {
					var p = localStorage.getItem('theme');
					if (p == d || (p != 'light' && matchMedia('(prefers-color-scheme:dark)').matches)) {
						document.documentElement.classList.add(d)
					}
						} catch (e) {}
					})('dark')`}
			</Script>
			{children}
		</>
	);
}
