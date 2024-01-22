<script lang="ts">
    import type { FormResponse } from "$lib/types"
    let createLink = true
    let oldUrl = "https://example.com"
    let newUrl = ""
    let err = ""
    let disabled = false
    async function submitForm () {
        disabled = true
        try {
            const res = await fetch("/api", {
                method: "POST",
                body: JSON.stringify({
                    url: oldUrl
                })
            })

            const body: FormResponse = await res.json()
            if (body.error) throw new Error(body.message)
            await console.log(body)
            newUrl = body.url

        } catch (error) {
            err = `${error}`
        }
        disabled = false
        createLink = false

    }

    function reset () {
        oldUrl = ""
        newUrl = ""
        err = ""
        createLink = true
    }
</script>
<div class="bg-white">  
    <div class="relative isolate px-6 pt-14 lg:px-8">
        <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
        </div>
        <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div class="hidden sm:mb-8 sm:flex sm:justify-center">
                <div class="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                    Open source service. <a href="https://github.com/moreSalt/url-shortener-client" target="_blank" class="font-semibold text-indigo-600"><span class="absolute inset-0" aria-hidden="true"></span>Check it out <span aria-hidden="true">&rarr;</span></a>
                </div>
            </div>
            <div class="text-center">
                <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl">Simple URL shortener</h1>
                <!-- <p class="mt-6 text-lg leading-8 text-gray-600">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.</p> -->
                <!-- <div class="mt-10 flex items-center justify-center gap-x-6">
                    <a href="#" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get started</a>
                    <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Learn more <span aria-hidden="true">→</span></a>
                </div> -->
   
            </div>
            <div class="flex flex-col items-center justify-center w-full my-12 bg-white shadow rounded-lg px-4 py-5">
                {#if createLink}
                    <form class="sm:flex sm:items-center w-full max-w-sm" method="POST" on:submit|preventDefault={submitForm}>
                        <div class="w-full sm:max-w-xs">
                        <label for="url" class="sr-only">URL</label>
                        <input type="url" name="url" id="url" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="https://www.example.com/foo/bar" bind:value={oldUrl}>
                        </div>
                        <button type="submit" disabled="{disabled}" class="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto">
                            {#if disabled}
                                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            {:else}
                                Submit
                            {/if}
                        
                        
                        </button>
                    </form>
                {:else}
                    {#if err}
                    <div class="rounded-md bg-red-50 p-4 w-full max-w-md">
                        <div class="flex">
                          <div class="flex-shrink-0">
                            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
                            </svg>
                          </div>
                          <div class="ml-3">
                            <h3 class="text-sm font-medium text-red-800">There were was an with your submission</h3>
                            <div class="mt-2 text-sm text-red-700">
                              <ul role="list" class="list-disc space-y-1 pl-5">
                                <li>{err}</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    {:else}
                        <button 
                            class="select-all rounded-md border-0 py-1.5 px-3 w-full max-w-xs text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            on:click={async () => {
                                await navigator.clipboard.writeText(newUrl)
                            }}
                        >
                            {newUrl}
                        </button>
                    {/if}
                    
                    <button type="button" class="mt-4 rounded-md bg-indigo-50 px-2.5 py-1.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100" on:click={reset}>Shorten another</button>
                {/if}


                <div class="bg-white ">
                    <div class="mx-auto max-w-7xl px-6 lg:px-8">
                      <dl class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div>
                          <dt class="font-semibold text-gray-900">Safe browsing</dt>
                          <dd class="mt-1 text-gray-600">All links are checked against the Google Safe Browsing API to protect users.</dd>
                        </div>
                        <div>
                          <dt class="font-semibold text-gray-900">Redirect links removed</dt>
                          <dd class="mt-1 text-gray-600">Links are checked for redirects, like affiliate links.</dd>
                        </div>
                        <div>
                          <dt class="font-semibold text-gray-900">Open source</dt>
                          <dd class="mt-1 text-gray-600">Source code is publicly available for the <a href="https://github.com/moreSalt/url-shortener-client" target="_blank" rel="noopener noreferrer" class="underline">client</a> and <a href="https://github.com/moreSalt/url-shortener" target="_blank" rel="noopener noreferrer" class="underline">functions</a>.</dd>
                        </div>
                        <div>
                          <dt class="font-semibold text-gray-900">Simple</dt>
                          <dd class="mt-1 text-gray-600">Easy to user, no account required.</dd>
                        </div>
            
                      </dl>
                    </div>
                  </div>
            </div>
        </div>
        <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
            <div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
        </div>
    </div>
</div>


  
