<script lang="ts">
import { page } from '$app/state';
import ButterEditor from '$lib/components/butter-editor.svelte';
import * as Card from '$lib/components/ui/card';
import { activeGuildStore } from '$lib/stores';
import { onMount } from 'svelte';
import { Button } from '$lib/components/ui/button';
import Save from 'lucide-svelte/icons/save';
import Download from 'lucide-svelte/icons/arrow-down-to-line';
import { toast } from 'svelte-sonner';

const scriptName = page.params.script;
let scriptData = $state('');
const scriptPromise = new Promise<string>((resolve) => {
    onMount(async () => {
        const scriptAddress = `https://cdn.buttercup.boo/${$activeGuildStore?.id}/${scriptName}`;
        const data = await fetch(scriptAddress, {
            cache: 'no-cache',
        }).then((res) => res.text());
        scriptData = data;
        resolve(data);
    });
});

const saveFile = async () => {
    let formData = new FormData();
    formData.append('guildId', `${$activeGuildStore?.id}`);
    formData.append('scriptName', `${scriptName}`);
    formData.append('fileData', scriptData);
    await fetch(page.url, {
        method: 'post',
        body: formData,
    }).then(async (res) => {
        if (res.ok) {
            toast.success('File Saved!');
        } else {
            // {"type":"error","error":{"message":"well shit"}}
            toast.error('Error saving file', {
                description: await res.text(),
                duration: 5000,
            });
        }
    });
};

const downloadFile = () => {
    const blob = new Blob([scriptData], { type: 'text/typescript' });
    const elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = `${scriptName}.ts`;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
};
</script>

<Card.Root>
    <Card.Header>
        <Card.Title>
            {scriptName}
        </Card.Title>
        <Card.Description class="flex flex-row-reverse gap-2">
            <Button onclick={downloadFile}  variant={'secondary'}><Download/></Button>
            <Button onclick={saveFile}><Save/></Button>
        </Card.Description>
    </Card.Header>
    <Card.Content>
        {#await scriptPromise then}
            <ButterEditor bind:value={scriptData}/>
        {/await}
    </Card.Content>
</Card.Root>
