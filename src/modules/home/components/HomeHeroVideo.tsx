'use client';

import { useEffect, useRef, useState } from 'react';

export function HomeHeroVideo() {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [motionAllowed, setMotionAllowed] = useState(false);

	useEffect(() => {
		const media = window.matchMedia('(prefers-reduced-motion: reduce)');
		const html = document.documentElement;

		const syncMotionPreference = () => {
			const allowed = !media.matches && !html.classList.contains('a11y-no-animations');
			setMotionAllowed(allowed);
			if (!allowed) videoRef.current?.pause();
		};

		syncMotionPreference();
		media.addEventListener('change', syncMotionPreference);
		const observer = new MutationObserver(syncMotionPreference);
		observer.observe(html, { attributes: true, attributeFilter: ['class'] });

		return () => {
			media.removeEventListener('change', syncMotionPreference);
			observer.disconnect();
		};
	}, []);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		if (!motionAllowed) {
			video.pause();
			return;
		}

		void video.play().catch(() => undefined);
	}, [motionAllowed]);

	return (
		<div className="home-hero-video-layer" aria-hidden="true">
			<video
				ref={videoRef}
				className="home-hero-video"
				muted
				loop
				playsInline
				preload="metadata"
				poster="/videos/luxury-car-driving-poster.png"
			>
				<source src="/videos/luxury-car-driving.mp4" type="video/mp4" />
			</video>
			<div className="home-hero-video-grade" />
		</div>
	);
}
