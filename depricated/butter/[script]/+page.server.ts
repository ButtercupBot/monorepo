import { error, type Actions } from "@sveltejs/kit";
import type { API } from "butter-api";
import { treaty } from "@elysiajs/eden";

const api = treaty<API>(Bun.env.API_URL, {
    headers: {
        Authorization: `Bearer ${Bun.env.API_KEY}`,
    },
});

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();

        const id = formData.get('guildId') as string;
        const butter = formData.get('scriptName') as string;
        const fileData = formData.get('fileData') as string;

        const response = await api.guild({ id }).butter({ butter }).post(fileData);
        if (response.error) return error(response.error.status, response.error.value.message);
        return true;
    }
};