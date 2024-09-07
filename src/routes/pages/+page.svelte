
<script lang="ts">
import Button from "$lib/components/ui/button/button.svelte";
import type { PageServerData } from "./$types";
import * as Table from "$lib/components/ui/table";

export let data: PageServerData;
</script>

<main class="h-full container flex flex-col gap-6 p-4">
    <form action="" method="get">
        <div class="flex items-center gap-6 justify-end">
            <input type="date" name="date" id="" class="border p-2" required>
            <Button type="submit">envoyer</Button>
        </div>
    </form>
    
<Table.Root>
    <Table.Caption>simulations list</Table.Caption>
    <Table.Header>
      <Table.Row>
        <Table.Head>Nom</Table.Head>
        <Table.Head>Phone</Table.Head>
        <Table.Head>Salaire</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each data.simulations as sim (sim.id)}
        <Table.Row>
          <Table.Cell class="font-medium">{sim.name}</Table.Cell>
          <Table.Cell>
            <a href="tel:{sim.phone}">
                {sim.phone}
            </a>
          </Table.Cell>
          <Table.Cell>{sim.salary}</Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</main>