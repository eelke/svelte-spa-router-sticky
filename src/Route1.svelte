<script>
  import { location, querystring, push } from 'svelte-spa-router';
  import { parse, stringify } from 'qs';

  // Use a reactive statement to ensure parsed gets updated every time $querystring changes
  $: parsed = parse($querystring);
  $: message = parsed?.q || 'Default message';

  function setQuery() {
    const newQuery = { ...parsed };
    newQuery.q = 'Another hello!';
    push(`${$location}?${stringify(newQuery)}`);
  }
</script>

<div>
  <h2>Route 1</h2>
  <p>The message is: {message}</p>
  <button on:click="{setQuery}">Change message</button>
  <code>{JSON.stringify(parsed)}</code>
</div>
