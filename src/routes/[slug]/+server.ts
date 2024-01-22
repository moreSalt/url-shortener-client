import { API_HOST } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export async function GET({params, fetch}) {
    let url = "/"
    try {
        const link = `${API_HOST}/api`
        
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'insomnia/8.3.0',
                "Origin": API_HOST
              },
            body: `{"type":"get", "value": "${params.slug}"}`
          };
        const res = await fetch(link, options);
        if (res.status !== 200) {
            throw new Error("Invalid status code")
        }
        const item = await res.json();
        url = item.id

        
    } catch (err) {
        await console.log("error:", err)
        throw redirect(302, '/')
    }
    redirect(302, url)
}