<script lang="ts">
    import { page } from "$app/stores";
    import Button from "$lib/components/ui/button/button.svelte";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { SimulationSchema } from "$lib/validation";
    import { Schema } from "@effect/schema";
    import { Either } from "effect";
    import { onMount } from "svelte";
    import { writable } from "svelte/store";

    const getEntry = (name: string) => {
        const entry = $page.url.searchParams.get(name);

        if (entry) {
            return Number(entry);
        } else {
            return undefined;
        }
    };
    const data = writable<{
        salary?: number;
        months?: number;
        previous?: number;
        total?: number;
        firstName?: string;
        lastName?: string;
        phone?: string;
    }>({});
    onMount(() => {
        $data = {
            salary: getEntry("salary"),
            months: getEntry("months") || 24,
            previous: getEntry("previous") || 0,
            total: getEntry("total"),
            firstName: $page.url.searchParams.get("firstName") || undefined,
            lastName: $page.url.searchParams.get("lastName") || undefined,
            phone: $page.url.searchParams.get("phone") || undefined,
        };
    });
    $: either = Schema.decodeUnknownEither(SimulationSchema)($data);
    $: formIsValid = Either.isRight(either);
    $: console.log(either);
</script>

<form
    action="/result"
    method="get"
    class="w-full flex flex-col items-center justify-center p-4 gap-6"
>
    <img class="h-16" src="/logo.png" alt="logo labaik tourisme et voyages" />
    <div class="flex w-full max-w-sm flex-col gap-1.5">
        <Label class="capitalize" for="lastName">Nom</Label>
        <Input
            required
            name="lastName"
            type="text"
            id="lastName"
            bind:value={$data.lastName}
        />
        <p class="text-muted-foreground text-sm">Nom de famille</p>
    </div>
    <div class="flex w-full max-w-sm flex-col gap-1.5">
        <Label class="capitalize" for="firstName">Prénom</Label>
        <Input
            required
            name="firstName"
            type="text"
            id="firstName"
            bind:value={$data.firstName}
        />
        <p class="text-muted-foreground text-sm">Votre Prénom</p>
    </div>
    <div class="flex w-full max-w-sm flex-col gap-1.5">
        <Label class="capitalize" for="phone">Tel</Label>
        <Input
            required
            name="phone"
            type="tel"
            id="phone"
            bind:value={$data.phone}
        />
        <p class="text-muted-foreground text-sm">Votre Numero de telephone</p>
    </div>
    <div class="flex w-full max-w-sm flex-col gap-1.5">
        <Label class="capitalize" for="salary">Salaire mensuel net</Label>
        <Input
            required
            name="salary"
            type="number"
            id="salary"
            bind:value={$data.salary}
        />
        <p class="text-muted-foreground text-sm">Plus de 30000.00 da</p>
    </div>
    <div class="flex w-full max-w-sm flex-col gap-1.5">
        <Label class="capitalize" for="previous"
            >capacité d'endettement consommée</Label
        >
        <Input
            required
            name="previous"
            type="number"
            id="previous"
            placeholder="0.0"
            bind:value={$data.previous}
        />
        <p class="text-muted-foreground text-sm">
            Mensualité des crédits en cours
        </p>
    </div>
    <div class="flex w-full max-w-sm flex-col gap-1.5">
        <Label class="capitalize" for="n">Durée du financement</Label>
        <Input
            required
            name="months"
            type="number"
            id="n"
            placeholder="0.0"
            min="12"
            max="24"
            step="1"
            bind:value={$data.months}
        />
        <p class="text-muted-foreground text-sm">Choisir entre 12 et 24 mois</p>
    </div>
    <div class="flex w-full max-w-sm flex-col gap-1.5">
        <Label class="capitalize" for="total"
            >Le montant Totale : (OMRA / SEJOURS)</Label
        >
        <Input
            required
            name="total"
            type="number"
            id="total"
            placeholder="0.0"
            bind:value={$data.total}
        />
        <p class="text-muted-foreground text-sm"></p>
    </div>
    {#if formIsValid}
        <Button type="submit">Resultat de la simulation</Button>
    {:else}
        <Button type="button" variant="secondary"
            >Resultat de la simulation</Button
        >
    {/if}
</form>
