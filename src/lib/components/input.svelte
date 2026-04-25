<script>
	import { slide } from 'svelte/transition';

	let {
		id,
		type,
		label,
		family = $bindable(),
		class: className,
		required = false,
		placeholder,
		min,
		max,
		step,
		options = [],
		error = false,
		value = $bindable(),
		...restProps
	} = $props();
</script>

<div class="align-center relative my-2 flex">
	{#if type == 'textarea'}
		<!-- Textarea -->
		<div class="textarea-wrapper grid">
			<textarea
				{...restProps}
				class="input input--textarea resize-none overflow-hidden {error
					? 'error'
					: ''} {className ?? ''}"
				{id}
				{placeholder}
				onInput={(this.parentNode.dataset.replicatedValue = this.value)}
			></textarea>
			<label for={id} class="input-label">
				{label}
				{#if required}
					<span class="required">*</span>
				{/if}
			</label>
			{#if error}
				<p class="mt-4 text-red-600" transition:slide>{error}</p>
			{/if}
		</div>
	{:else if type == 'select'}
		<!-- List -->
		<select {id} class="select w-full" bind:value>
			{#each options as { value, label } (value)}
				<option {value}>{label}</option>
			{/each}
		</select>
	{:else if type == 'toggle'}
		<!-- Toggle Switch -->
		<label
			class="switch-wrapper relative inline-block h-7 w-14 overflow-hidden rounded-full transition-all"
		>
			<input
				{...restProps}
				class="input switch h-0 w-0 opacity-0"
				type="checkbox"
				bind:checked={value}
			/>
			<div class="slider absolute inset-0 flex cursor-pointer items-center px-2 transition-all">
				<div class="slider-dot relative h-4 w-4 rounded-full transition-all ease-out"></div>
			</div>
		</label>
	{:else if type == 'radio'}
		<!-- Radio -->
		<div class="flex items-center space-x-4 {className ?? ''}" {...restProps}>
			{#each options as { label, value } (value)}
				<label class="flex items-center space-x-2">
					<input class="radio hidden" type="radio" {value} bind:group={family} />
					<div
						class="radio-ui flex h-5 w-5 items-center justify-center rounded-full border border-stone-300 transition-all"
					>
						<div class="h-2.5 w-2.5 rounded-full bg-stone-50"></div>
					</div>
					<div>{label}</div>
				</label>
			{/each}
		</div>
	{:else if type == 'range'}
		<label for={id} class="input-label">
			{label}
			{#if required}
				<span class="required">*</span>
			{/if}
		</label>
		<input {type} {min} {max} {step} bind:value />
	{:else}
		<!-- Email / Text -->
		<div class="w-full">
			<input
				{...restProps}
				{id}
				{type}
				class="input w-full {error ? 'error' : ''} {className ?? ''}"
				{placeholder}
				bind:value
			/>
			<label for={id} class="input-label">
				{label}
				{#if required}
					<span class="required">*</span>
				{/if}
			</label>
			{#if error}
				<p class="mt-4 text-red-600" transition:slide>{error}</p>
			{/if}
		</div>
	{/if}
</div>

<style>
	@reference 'tailwindcss';

	.input,
	.select {
		--element-color: var(--color-stone-100);
		@apply rounded-xl border border-stone-200 bg-white px-4 py-2 text-emerald-950;
	}

	.radio:checked + .radio-ui {
		@apply border-none;
		background-color: var(--color-stone-800);
	}

	.radio-ui,
	.radio-ui > div {
		background-color: var(--color-stone-100);
		border-color: var(--color-stone-200);
	}

	.switch-wrapper {
		--element-color: var(--color-primary-50, var(--color-stone-200));
		/* --color-shadow: var(--color-primary-100, var(--color-stone-200)); */
		--color-dot: var(--color-primary-400, var(--color-stone-800));
	}

	.switch-wrapper:has(.switch:checked) {
		--color-dot: var(--color-primary-50, var(--color-stone-50));
		--element-color: var(--color-primary-400, var(--color-stone-800));
		/* --color-shadow: var(--color-primary-500, var(--color-stone-950)); */
	}

	.slider {
		background-color: var(--element-color);
	}

	.switch:checked + .slider {
		background-color: var(--element-color);
	}

	.slider-dot {
		--size: 1.125rem;

		left: 0;
		width: var(--size);
		height: var(--size);

		background-color: var(--color-dot);
	}

	.switch:checked + .slider > .slider-dot {
		left: calc(100% - var(--size));
		background-color: var(--color-dot);
	}
</style>
