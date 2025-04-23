<script lang="ts">
export const ssr = false;
import { onMount } from 'svelte';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import { mode } from 'mode-watcher';

let { value = $bindable() }: { value: string } = $props();

onMount(async () => {
    const monaco = await import('monaco-editor');
    self.MonacoEnvironment = {
        getWorker: () => new tsWorker(),
    };

    const setTheme = (state: 'light' | 'dark' | undefined) => {
        monaco.editor.defineTheme('clear', {
            colors: {
                'editor.background': '#ffffff00',
            },
            base: state === 'light' ? 'vs' : 'vs-dark',
            inherit: true,
            rules: [],
        });
    };

    mode.subscribe(setTheme);

    monaco.editor.setTheme('clear');
    const editor = monaco.editor.create(
        document.getElementById('editor-container') as HTMLDivElement,
        {
            value: value,
            language: 'typescript',
        },
    );
    editor.onDidChangeModelContent(() => {
        value = editor.getValue();
    });
});
</script>

<div class="flex h-screen w-full flex-col">
	<div class="flex-grow" id="editor-container" ></div>
</div>
