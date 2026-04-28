<script>
	import { Icon } from '$components';
	import { createWiggle } from '$lib/wiggle';

	let { name, class: className, ...restProps } = $props();

	let rotation = $state(0);

	const wiggle = createWiggle({ peak: 10, wiggles: 5 });

	function onWiggle() {
		wiggle((value) => (rotation = value));
	}
</script>

<div
	class="rounded-2xl p-3 {className}"
	{...restProps}
	onmouseenter={onWiggle}
	style="transform: rotate({rotation}deg);"
>
	<Icon {name} size="32px" />
</div>
