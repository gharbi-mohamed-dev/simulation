<script lang="ts">
    import { page } from "$app/stores";
    import { simulate, type SimulationValue } from "$lib/simulation";
    import { SimulationSchema } from "$lib/validation";
    import { Schema } from "@effect/schema";
    import { Either } from "effect";
    import * as Table from "$lib/components/ui/table";
    import Button from "$lib/components/ui/button/button.svelte";
    import { onMount } from "svelte";

    const getEntry = (name: string) => $page.url.searchParams.get(name);
    let result: SimulationValue | undefined;
    let errors = false;
    let link = "";
    onMount(() => {
        const entries = {
            months: getEntry("months"),
            total: getEntry("total"),
            salary: getEntry("salary"),
            previous: getEntry("previous"),
        };

        const either = Schema.decodeUnknownEither(SimulationSchema)(entries);

        if (Either.isLeft(either)) {
            errors = true;
        } else {
            const data = either.right;
            let search = new URLSearchParams(
                Object.entries(data).map(([key, value]) => [
                    key,
                    String(value),
                ]),
            );
            link = search.toString();
            result = simulate(data);
        }
    });
</script>

<!-- 
<pre>
    {result && JSON.stringify(result, null, 2)}
</pre> -->
<main class="w-full flex flex-col items-center justify-center p-4">
    <Button variant="link" href="/{link.length > 0 ? `?${link}` : ''}"
        >Retour</Button
    >
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
                <Table.Cell>{result?.monthly || "invalid"}</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell class="font-medium">Nombre de mois</Table.Cell>
                <Table.Cell>{result?.aksat || "invalid"}</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell class="font-medium"
                    >Cout De Revient De La Omra</Table.Cell
                >
                <Table.Cell>{result?.cost || "invalid"}</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell class="font-medium">Apport Initiale</Table.Cell>
                <Table.Cell>{result?.hamich || "invalid"}</Table.Cell>
            </Table.Row>
        </Table.Body>
    </Table.Root>
</main>
