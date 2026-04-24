<script>
	import ColorPicker from 'svelte-awesome-color-picker';
	import { Input } from '$components';

	let { color = $bindable(), ...restProps } = $props();
</script>

<div class="relative flex items-center">
	<div class="absolute right-3 z-10 size-6 rounded-lg" style={`background-color: ${color}`}>
		<ColorPicker
			bind:hex={color}
			isAlpha="false"
			sliderDirection="horizontal"
			position="responsive"
			label=""
			{...restProps}
		/>
	</div>
	<div class="w-full">
		<Input type="text" name="name" bind:value={color} class="w-full" />
	</div>
</div>
