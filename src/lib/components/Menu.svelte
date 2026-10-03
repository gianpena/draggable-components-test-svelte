<script lang="ts">
    import Draggable from "#lib/components/Draggable.svelte";
    import appState from "#lib/state.svelte.ts";
    import { onMount, untrack } from "svelte";

    let { items }: { items: string[] } = $props();
    let itemsReactive = $state(untrack(() => [...items]));
    let div: HTMLElement | null = $state(null);
    let insertIndex: number | null = $state(null);

    function pointerDown(event: PointerEvent) {
        if(appState.originalIndex === undefined) return;
        itemsReactive.splice(appState.originalIndex, 1);

    }

    function pointerMove(event: PointerEvent) {
        if(!appState.draggedElement || !div) return;

        const rect = div.getBoundingClientRect();
        if(event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
            insertIndex = null;
            return;
        }

        const children = div.querySelectorAll<HTMLElement>("[data-item]");
        insertIndex = children.length;
        for(let i = 0; i < children.length; i++) {
            const r = children[i].getBoundingClientRect();
            if(event.clientY < r.top + r.height / 2) {
                insertIndex = i;
                break;
            }
        }
    }

    function pointerUp(event: PointerEvent) {
        if(appState.originalIndex === undefined) return;      
        itemsReactive.splice(insertIndex ?? itemsReactive.length, 0, appState.draggedElement?.textContent || "");
        insertIndex = null;
    }

    onMount(() => {
        div?.addEventListener("pointerdown", pointerDown);
        div?.addEventListener("pointerup", pointerUp);
        window.addEventListener("pointermove", pointerMove);

        return () => {
            div?.removeEventListener("pointerdown", pointerDown);
            div?.removeEventListener("pointerup", pointerUp);
            window.removeEventListener("pointermove", pointerMove);
        };
    });

</script>

<div bind:this={div} class="bg-blue-100 m-2 border-2 border-blue-200 border-solid rounded-sm {appState.draggedElement ? "hover:bg-green-100 hover:border-green-300" : ""}">
    {#each itemsReactive as item, index (index)}
        {#if insertIndex === index}
            <div class="p-2 m-2 border-2 border-dashed border-green-400 rounded-sm bg-green-50" style:height="{appState.draggedElement?.getBoundingClientRect().height ?? 40}px" style:box-sizing="border-box"></div>
        {/if}
        <Draggable content={item} index={index} />
    {/each}
    {#if insertIndex === itemsReactive.length}
        <div class="p-2 m-2 border-2 border-dashed border-green-400 rounded-sm bg-green-50" style:height="{appState.draggedElement?.getBoundingClientRect().height ?? 40}px" style:box-sizing="border-box"></div>
    {/if}
</div>