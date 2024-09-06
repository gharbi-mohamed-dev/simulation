<script lang="ts">
import { page } from "$app/stores";
import Button from "$lib/components/ui/button/button.svelte";
import { Input } from "$lib/components/ui/input/index.js";
import { Label } from "$lib/components/ui/label/index.js";
import { SimulationSchema } from "$lib/validation";
import * as RadioGroup from "$lib/components/ui/radio-group/index.js";
import { Schema } from "@effect/schema";
import { Either } from "effect";
import { onMount } from "svelte";
import { writable } from "svelte/store";
import { goto } from "$app/navigation";
import { browser } from "$app/environment";

const getEntry = (name: string) => {
	const entry = $page.url.searchParams.get(name);

	if (entry) {
		return Number(entry);
	}
};
const data = writable<{
	salary?: number;
	months?: number;
	previous?: number;
	total?: number;
	name?: string;
	phone?: string;
}>({});
const lang = writable<"ar" | "fr">(
	$page.url.searchParams.get("lang") === "fr" ? "fr" : "ar",
);

onMount(() => {
	$data = {
		salary: getEntry("salary"),
		months: getEntry("months") || 24,
		previous: getEntry("previous") || 0,
		total: getEntry("total"),
		name: $page.url.searchParams.get("name") || undefined,
		phone: $page.url.searchParams.get("phone") || undefined,
	};
});

// const submit = async (e: SubmitEvent) => {
//     const either = Schema.decodeUnknownEither(SimulationSchema)($data)

//     if(Either.isLeft(either)) {

//     }
// }
const changeLang = async (lang: string) => {
	console.log({ lang });
	if (browser && $page.url.searchParams.get("lang") !== lang) {
		$page.url.searchParams.set("lang", lang);
		await goto($page.url);
	}
};

$: changeLang($lang);
$: either = Schema.decodeUnknownEither(SimulationSchema)($data);
$: formIsValid = Either.isRight(either);
$: console.log(either);
</script>
<div
class="w-full flex flex-col items-center justify-center"
>

<form
    action="/result"
    method="get"
    class=" flex flex-col  p-4 gap-6"
>
<div class="flex items-center justify-between">
    <img class="h-16" src="/logo.png" alt="logo labaik tourisme et voyages" />
        <input type="hidden" name="lang" value={$lang}>
       <RadioGroup.Root  bind:value={$lang} >
        <div class="flex items-center space-x-2">
         <RadioGroup.Item value="fr" id="fr" />
         <Label for="fr">Français</Label>
        </div>
        <div class="flex items-center space-x-2">
         <RadioGroup.Item value="ar" id="ar" />
         <Label for="ar">العربية</Label>
        </div>
       </RadioGroup.Root>
</div>
<div class="flex flex-col gap-6"
dir="{$lang === 'ar' ? 'rtl': 'ltr'}"

>

    <div class="flex w-full max-w-sm flex-col gap-1.5">
        <Label class="capitalize" for="name">
            {#if  $lang === 'fr'}
                Nom
            {:else}
            اسم 
            {/if}
        </Label>
        <Input
            required
            name="name"
            type="text"
            id="name"
            bind:value={$data.name}
        />
        <p class="text-muted-foreground text-sm">
            {#if  $lang === 'fr'}
            Votre Nom complet nom de famille + prenom
            {:else}اسمك الكامل اسم العائلة + الاسم الأول
            {/if}
        </p>
    </div>
    <div class="flex w-full max-w-sm flex-col gap-1.5">
        <Label class="capitalize" for="phone">    
            {#if  $lang === 'fr'}
            Tel
            {:else}هاتف
            {/if}
        </Label>
        <Input
            required
            name="phone"
            type="tel"
            id="phone"
            bind:value={$data.phone}
        />
        <p class="text-muted-foreground text-sm">
            {#if  $lang === 'fr'}
            Votre Numero de telephone
            {:else}رقم هاتفك{/if}

        </p>
    </div>
    <div class="flex w-full max-w-sm flex-col gap-1.5">
        <Label class="capitalize" for="salary">
            {#if  $lang === 'fr'}
            Salaire mensuel net
            {:else}الراتب الشهري الصافي
            {/if}
        </Label>
        <Input
            required
            name="salary"
            type="number"
            id="salary"
            bind:value={$data.salary}
        />
        <p class="text-muted-foreground text-sm">
            {#if  $lang === 'fr'}
            Plus de 30000.00 da
            {:else}الحد الأدنى 30000.00 دج
            {/if}
        </p>
    </div>
    <div class="flex w-full max-w-sm flex-col gap-1.5">
        <Label class="capitalize" for="previous">
            {#if  $lang === 'fr'}
            capacité d'endettement consommée
            {:else}
            قيمة الديون الحالية شهريا للقروض السابقة
            {/if}
        </Label>
        <Input
            required
            name="previous"
            type="number"
            id="previous"
            placeholder="0.0"
            bind:value={$data.previous}
        />
        <p class="text-muted-foreground text-sm">
            {#if  $lang === 'fr'}
            Mensualité des crédits en cours
            {:else}
            السداد الشهري للقروض المستحقة في الوقت الحالي
           {/if}
        </p>
    </div>
    <div class="flex w-full max-w-sm flex-col gap-1.5">
        <Label class="capitalize" for="n">
            {#if  $lang === 'fr'}
            Durée du financement
            {:else}
            مدة التقسيط 

            {/if}
        </Label>
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
        <p class="text-muted-foreground text-sm">
            {#if  $lang === 'fr'}
            Choisir entre 12 et 24 mois
            {:else}
                الاختيار بين 12 و24شهرا
            {/if}
        </p>
    </div>
    <div class="flex w-full max-w-sm flex-col gap-1.5">
        <Label class="capitalize" for="total">
            {#if  $lang === 'fr'}
            Le montant Totale : (OMRA / SEJOURS)
            {:else}
            المبلغ الإجمالي ل: العمرة / الرحلة
            {/if}
        </Label>
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
        <Button type="submit">
            {#if  $lang === 'fr'}
            Resultat de la simulation
            {:else}
            نتيجة المحاكاة
            {/if}
        </Button>
    {:else}
        <Button type="button" variant="secondary">
            {#if  $lang === 'fr'}
            Resultat de la simulation
            {:else}
            نتيجة المحاكاة
            {/if}
        </Button>
    {/if}
</div>

</form>
</div>
