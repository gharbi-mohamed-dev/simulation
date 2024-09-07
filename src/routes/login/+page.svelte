<script lang="ts">
import Button from "$lib/components/ui/button/button.svelte";
import { Input } from "$lib/components/ui/input/index.js";
import { Label } from "$lib/components/ui/label/index.js";
import type { ActionData } from "./$types";
export let form: ActionData;
</script>
   
<div class='h-full flex items-center justify-center'>
    <form action="" method="post" class="flex flex-col gap-6">
        {#if form?.success === false}
        <small class="text-sm font-medium leading-none text-red-500 text-center">username ou mot de pass invalide</small>
        {/if}
        <div class="flex w-full max-w-sm flex-col gap-1.5">
            <Label for="username">username</Label>
            <Input type="username" id="username" placeholder="username" name="username"/>
        </div>
        <div class="flex w-full max-w-sm flex-col gap-1.5">
            <Label for="password">password</Label>
            <Input type="password" id="password" placeholder="password" name="password" />
        </div>
        <Button type="submit">login</Button>
    </form>
</div>