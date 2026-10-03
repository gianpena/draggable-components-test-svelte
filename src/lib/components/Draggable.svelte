<script lang="ts">
    import appState from "#lib/state.svelte.ts";
    import { onMount } from "svelte";

    let { content, index }: { content: string; index: number } = $props();
    let div: HTMLElement | null = $state(null);

    const clss = "bg-gray-300 p-2 m-2 border-2 border-gray-400 border-solid rounded-sm select-none";

    function pointerDown(event: PointerEvent) {
        event.preventDefault();

        if(!div) return;
        appState.originalIndex = index;

        appState.draggedElement = document.createElement("div");
        const x = event.clientX;
        const y = event.clientY;

        const rect = div.getBoundingClientRect();
        appState.offsetX = x - rect.left;
        appState.offsetY = y - rect.top;

        appState.draggedElement.style.position = "absolute";
        appState.draggedElement.style.left = `${x - appState.offsetX}px`;
        appState.draggedElement.style.top = `${y - appState.offsetY}px`;
        appState.draggedElement.style.width = `${rect.width}px`;
        appState.draggedElement.style.height = `${rect.height}px`;
        appState.draggedElement.textContent = content;
        appState.draggedElement.className = `${clss} pointer-events-none`;

        document.body.appendChild(appState.draggedElement);

    }

    onMount(() => {

        div?.addEventListener("pointerdown", pointerDown);

        return () => {
            div?.removeEventListener("pointerdown", pointerDown);
        };
    });

</script>

<div bind:this={div} data-item class={clss}>
    {content}
</div>