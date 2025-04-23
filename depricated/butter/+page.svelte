<script lang="ts">
import { page } from '$app/state';
import { activeGuildStore } from '$lib/stores';
import { syncActiveGuild } from '$lib/utils';
import { onMount } from 'svelte';
import { get } from 'svelte/store';
import * as Card from '$lib/components/ui/card';
import { Button } from '$lib/components/ui/button';
import Pen from 'lucide-svelte/icons/pen-line';
import Delete from 'lucide-svelte/icons/trash-2';

let scripts: string[] = [];

onMount(syncActiveGuild);
onMount(async () => {
    let formData = new FormData();
    formData.append('id', get(activeGuildStore)?.id as string);
    scripts = await fetch(page.url, {
        method: 'post',
        body: formData,
    })
        .then((res) => res.json())
        .then((res) => {
            const data = JSON.parse(res.data) as string[];
            return data.slice(1);
        });
});
</script>

{#each scripts as script}
    <Card.Root>
        <Card.Header>
            <Card.Title>
                {script.split('/').at(-1)}
            </Card.Title>
        </Card.Header>
        <Card.Content>
            <Button onclick={() => {location.href += `/${script.split('/').at(-1) as string}`}} variant={'secondary'}>
                Edit
                <Pen/>
            </Button>
            <Button variant={'destructive'}>
                Delete
                <Delete/>
            </Button>
        </Card.Content>
    </Card.Root>
{/each}

