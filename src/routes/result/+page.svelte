<script lang="ts">
import { page } from "$app/stores";
import * as Table from "$lib/components/ui/table";
import Button from "$lib/components/ui/button/button.svelte";
import type { PageServerData } from "./$types";
export let data: PageServerData;
const lang: "fr" | "ar" =
	$page.url.searchParams.get("lang") === "fr" ? "fr" : "ar";
$page.url.searchParams.set("lang", lang);

const link = $page.url.search.toString();
</script>

<!-- 
<pre>
    {result && JSON.stringify(result, null, 2)}
</pre> -->
<main class="w-full flex flex-col items-center justify-center p-4"
dir="{lang === 'ar' ? 'rtl': 'ltr'}"
>
    <Button variant="link" href="/{link.length > 0 ? `${link}` : ''}" class='underline'>
        {#if lang === 'fr'}
        Faire une nouvelle simulation
        {:else}
        تشغيل محاكاة جديدة
        {/if}
    </Button>
    <Table.Root>
        <Table.Caption>
            {#if lang === 'fr'}
            Résultats de la simulation
            {:else}
            نتائج المحاكاة
            {/if}

        </Table.Caption>
      
        <Table.Body>
            <Table.Row>
                <Table.Cell class="font-medium"
                    >
                    {#if lang === 'fr'}
                    Remboursement mensuel
                    {:else}
                    السداد الشهري
                    {/if}
                    </Table.Cell
                >
                <Table.Cell
                    >{data.success
                        ? data.result.monthly
                        : "invalid"}</Table.Cell
                >
            </Table.Row>
            <Table.Row>
                <Table.Cell class="font-medium">
                    {#if lang === 'fr'}
                    Nombre de versement
                    {:else}
                    عدد الأقساط
                    {/if}
                </Table.Cell>
                <Table.Cell
                    >{data.success ? data.result.aksat : "invalid"}</Table.Cell
                >
            </Table.Row>
            <Table.Row>
                <Table.Cell class="font-medium">
                    {#if lang === 'fr'}
                    Montant du financement
                    {:else}
                    قيمة التمويل
                    {/if}
                </Table.Cell>
                <Table.Cell
                    >{data.success ? data.result.montantFinacement : "invalid"}</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell class="font-medium">
                    {#if lang === 'fr'}
                    Cout De Revient De La Omra
                    {:else}
                    التكلفة الإجمالية بالتقسيط 
                    {/if}
                </Table.Cell>
                <Table.Cell
                    >{data.success ? data.result.cost : "invalid"}</Table.Cell
                >
            </Table.Row>
            <Table.Row>
                <Table.Cell class="font-medium">
                    {#if lang === 'fr'}
                    Apport Initiale
                    {:else}
                    قيمة المساهمة الأولية
                    {/if}
                </Table.Cell>
                <Table.Cell
                    >{data.success ? data.result.hamich : "invalid"}</Table.Cell
                >
            </Table.Row>
        </Table.Body>
    </Table.Root>
</main>
