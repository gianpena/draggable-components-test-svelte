<script lang="ts">
    import Menu from "#lib/components/Menu.svelte";
    import Draggable from "#lib/components/Draggable.svelte";
    import appState from "#lib/state.svelte.ts";
    import { onMount } from "svelte";

    function pointerMove(event: PointerEvent) {
        if(!appState.draggedElement) return;
        const x = event.clientX;
        const y = event.clientY;

        appState.draggedElement.style.left = `${x - appState.offsetX}px`;
        appState.draggedElement.style.top = `${y - appState.offsetY}px`;
    }

    function pointerUp(event: PointerEvent) {
        if(!appState.draggedElement) return;
        appState.draggedElement.remove();
        appState.draggedElement = null;
        appState.originalIndex = undefined;
        appState.offsetX = 0;
        appState.offsetY = 0;
    }

    onMount(() => {
        window.addEventListener("pointermove", pointerMove);
        window.addEventListener("pointerup", pointerUp);

        return () => {
            window.removeEventListener("pointermove", pointerMove);
            window.removeEventListener("pointerup", pointerUp);
        };
    });

</script>

<div class="mx-[10vw] my-2 flex flex-row">
    <Menu items={["Item 1", "Item 2", "Item 3"]} />
    <Menu items={["Item 4", "Item 5"]} />
</div>