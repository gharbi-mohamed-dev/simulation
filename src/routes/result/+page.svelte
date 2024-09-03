<script lang="ts">
    import { page } from "$app/stores";
    import * as Table from "$lib/components/ui/table";
    import Button from "$lib/components/ui/button/button.svelte";
    import type { PageServerData } from "./$types";
    export let data: PageServerData;
    let link = $page.url.search.toString();
</script>

<!-- 
<pre>
    {result && JSON.stringify(result, null, 2)}
</pre> -->
<main class="w-full flex flex-col items-center justify-center p-4">
    <Button variant="link" href="/{link.length > 0 ? `${link}` : ''}"
        >Retour
    </Button>
    <Table.Root>
        <Table.Caption>Résultats de la simulation</Table.Caption>
        <Table.Header>
            <Table.Row>
                <Table.Head class="">Etapes</Table.Head>
                <Table.Head>Valeur</Table.Head>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            <Table.Row>
                <Table.Cell class="font-medium"
                    >Remboursement mensuel</Table.Cell
                >
                <Table.Cell
                    >{data.success
                        ? data.result.monthly
                        : "invalid"}</Table.Cell
                >
            </Table.Row>
            <Table.Row>
                <Table.Cell class="font-medium">Nombre de mois</Table.Cell>
                <Table.Cell
                    >{data.success ? data.result.aksat : "invalid"}</Table.Cell
                >
            </Table.Row>
            <Table.Row>
                <Table.Cell class="font-medium"
                    >Cout De Revient De La Omra</Table.Cell
                >
                <Table.Cell
                    >{data.success ? data.result.cost : "invalid"}</Table.Cell
                >
            </Table.Row>
            <Table.Row>
                <Table.Cell class="font-medium">Apport Initiale</Table.Cell>
                <Table.Cell
                    >{data.success ? data.result.hamich : "invalid"}</Table.Cell
                >
            </Table.Row>
        </Table.Body>
    </Table.Root>
</main>
