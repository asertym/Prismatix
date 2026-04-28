export function load() {
	return {
		tipsArray: [
			'For body text, try setting your line-height to roughly 1.5 times the font size. It prevents lines from blurring together and significantly improves reading comprehension.',
			' Stick to a maximum of two font families per project: one for headings and one for body text. Too many fonts create visual noise and increase page load times.',
			'Instead of #000000, try a very dark grey (like #1A1A1A). Pure black on a pure white background can cause "halation" that makes reading difficult for some users.',
			'Use font weight and scale, not just size, to show importance. A bold 16px header can often be more effective than a light 20px header.',
			'Use increments of 8 (8, 16, 24, 32...) for padding, margins, and sizing. It creates a mathematical rhythm that makes handoff to developers seamless and ensures a consistent UI.',
			'Don’t fear empty space. White space isn\'t "wasted" space; it is a functional element used to group related items and reduce cognitive load.',
			'Elements that are close together are perceived as related. Use spacing to visually "group" labels with their respective input fields to guide the user’s eye.',
			'Never use color as the only way to communicate meaning (e.g., a red border for an error). Always include an icon or text label for users with color blindness.',
			'Always run your text/background combinations through a WCAG contrast checker. Aim for a ratio of at least 4.5:1 for normal text to ensure accessibility.',
			'For a balanced color palette, use a primary color for 60% of the design, a secondary color for 30%, and an accent color for the final 10%.',
			'When designing dark mode, avoid pure black backgrounds. Use deep greys to allow for subtle shadows and depth, which are harder to see on true black.',
			"Users spend most of their time on other sites. This means they prefer your site to work the same way as all the others they know. Don't reinvent the wheel for standard navigation patterns.",
			'Whenever a user performs an action (like clicking a button), provide visual feedback—a loading spinner, a color change, or a toast notification. Never leave them wondering if the click "worked."',
			'Instead of a generic spinning loader, use skeleton screens (blank versions of the UI that are about to load). This reduces perceived wait time and makes the app feel faster.',
			'Try to not overwhelm users with too many choices at once. Use progressive disclosure and show only the information necessary for the current task.',
			'Users often scan web content in an F-shaped pattern (top horizontal, then a shorter horizontal, then vertical). Place your most important information along these paths.',
			'When designing layouts, think in terms of "rows" and "columns." This makes it much easier for developers to translate your static design into CSS Flexbox or Grid.',
			'Instead of sending random hex codes, provide a list of "Design Tokens" (e.g., color-primary, spacing-small, font-size-lg). This creates a shared language between design and code.',
			'A great designer doesn\'t just design the "perfect" state. Always design for the "empty state" (no data), the "error state," and the "loading state."',
			'Ensure all icons are designed on a consistent pixel grid (e.g., 24x24). This prevents blurry rendering and makes it much easier for developers to implement them as SVGs.'
		]
	};
}
