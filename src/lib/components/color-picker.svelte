<script>
	import ColorPicker from 'svelte-awesome-color-picker';
	import Color from 'colorjs.io';
	import { Input } from '$components';

	let c = $derived('');
	$effect(() => {
		c = new Color(color).to('hsl').set('s', 100).set('l', 50).toString({ format: 'hex' });
	});

	let { class: className, color = $bindable(), ...restProps } = $props();
</script>

<div class="relative flex items-center {className}">
	<div class="absolute right-2 z-10 size-7 rounded-lg" style={`background-color: ${color}`}>
		<ColorPicker
			bind:hex={color}
			isAlpha={false}
			position="responsive"
			sliderDirection="horizontal"
			label=""
			--input-color={c}
			{...restProps}
		/>
	</div>
	<div class="w-full">
		<Input type="text" name="name" bind:value={color} class=" w-full" />
	</div>
</div>
