import { XataClient } from "$lib/xata";
import type { Actions } from "@sveltejs/kit";

const xata = new XataClient({
    apiKey: Bun.env.XATA_API_KEY,
    branch: Bun.env.XATA_BRANCH,
});

export const actions: Actions = {
    default: async ({ request }) => {
        const guild = (await request.formData()).get('id') as string;
        const record = await xata.db.butterscripts
            .select(['guild_id', 'script_ids'])
            .filter({ guild_id: { $is: guild } })
            .getFirst();

        const scripts: string[] = [];

        if (!record) return scripts;
        if (!record.script_ids) return scripts;

        for (const script of record.script_ids) scripts.push(`https://cdn.buttercup.boo/${guild}/${script}`);

        return scripts;
    }
};