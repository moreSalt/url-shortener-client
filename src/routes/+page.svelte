<script lang="ts">
    import type { FormResponse } from "$lib/types"
    let createLink = true
    let oldUrl = ""
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
        <div class="mx-auto max-w-2xl">
            <!-- <div class="hidden sm:mb-4 sm:flex sm:justify-center">
                <div class="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                    Open source service. <a href="https://github.com/moreSalt/url-shortener-client" target="_blank" class="font-semibold text-indigo-600"><span class="absolute inset-0" aria-hidden="true"></span>Check it out <span aria-hidden="true">&rarr;</span></a>
                </div>
            </div> -->
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
                        <input type="url" name="url" id="url" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="https://www.example.com/foo/bar" bind:value={oldUrl}>
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
    


                        <div class="relative mt-2 rounded-md shadow-sm w-full max-w-xs select-all">
                            <button 
                                class="select-all block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                on:click={async () => {
                                    await navigator.clipboard.writeText(newUrl)
                                }}
                            >
                                {newUrl}
                            </button>
                            
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                              <svg class="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke-width="1" stroke="currentColor" >
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" clip-rule="evenodd" />
                              </svg>
                            </div>
                          </div>

                          <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                          </svg> -->
                          
                    {/if}
                    
                    <button type="button" class="mt-4 rounded-md bg-indigo-50 px-2.5 py-1.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100" on:click={reset}>Shorten another</button>
                {/if}


                <div class="bg-white ">
                    <div class="mx-auto max-w-7xl px-6 lg:px-8">
                      <dl class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div>
                          <dt class="font-semibold text-gray-900">Safe browsing</dt>
                          <dd class="mt-1 text-gray-600">All links are checked against the Google Safe Browsing API.</dd>
                        </div>
                        <div>
                          <dt class="font-semibold text-gray-900">Redirect links removed</dt>
                          <dd class="mt-1 text-gray-600">Avoid affiliate and tracking links.</dd>
                        </div>
                        <div>
                          <dt class="font-semibold text-gray-900">Open source</dt>
                          <dd class="mt-1 text-gray-600">Source code is publicly available for the <a href="https://github.com/moreSalt/url-shortener-client" target="_blank" rel="noopener noreferrer" class="underline">client</a> and <a href="https://github.com/moreSalt/url-shortener" target="_blank" rel="noopener noreferrer" class="underline">functions</a>.</dd>
                        </div>
                        <div>
                          <dt class="font-semibold text-gray-900">Simple</dt>
                          <dd class="mt-1 text-gray-600">Easy to use, no account required.</dd>
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


  
