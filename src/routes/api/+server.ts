import { API_HOST } from '$env/static/private';
import { json } from '@sveltejs/kit';

export async function POST({params, fetch, request, url}) {
    try {
        const body = await request.json()
        const link = `${API_HOST}/api`

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'insomnia/8.3.0',
                "Origin": API_HOST
              },
            body: JSON.stringify({
                type: "post",
                value: body.url
            })
          };
        const res = await fetch(link, options);
        if (res.status !== 200) {
            throw new Error("Invalid status code " + res.status)
        }

        
        const item = await res.json();

        if (item.id === "") {
            throw new Error("For some reason we could not shorten this url")
        }
        return json({
            error: false,
            message: "",
            url: `${url.origin}/${item.id}`
        })

        
    } catch (err) {
        await console.log("error:", err)
        return json({
            error: true,
            message: `${err}`,
            url: ""
        })
    }
}