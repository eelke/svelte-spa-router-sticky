<script>
  import { writable } from 'svelte/store';
  import Router, {
    location,
    querystring,
    push,
    pop,
    link,
  } from 'svelte-spa-router';

  import { parse, stringify } from 'qs';

  import Home from './Home.svelte';
  import Route1 from './Route1.svelte';
  import Route2 from './Route2.svelte';

  const someVariableStore = writable(0);

  // Parse the querystring into a reactive object
  $: parsedQuery = parse($querystring) ?? {};

  // Set someVariableStore if found in query param
  $: {
    if (parsedQuery?.i) {
      $someVariableStore = parseInt(parsedQuery.i, 10);
    }
  }

  // Set the document title to reflect variable in history
  $: title = `Current Count: ${$someVariableStore}`;

  // Counter variables
  let countTimeout;
  let enableCount = false;

  async function count() {
    if (!enableCount) return;
    if (countTimeout) clearTimeout(countTimeout);

    // Update store
    someVariableStore.update((i) => parseInt(i, 10) + 1);

    // Update Query Param
    updateQuery();

    // Repeat
    countTimeout = setTimeout(() => {
      count();
    }, 1000);
  }

  // Update Query Param
  function updateQuery() {
    const newQuery = { ...parsedQuery };
    newQuery.i = $someVariableStore;
    push(`${$location}?${stringify(newQuery)}`);
  }

  const routes = {
    '/': Home,
    '/route-1': Route1,
    '/route-2': Route2,
  };

  // Get some info on the transition
  function routeLoading(event) {
    // eslint-disable-next-line no-console
    console.log(
      'Route:',
      event.detail.route,
      'Querystring: ',
      event.detail.querystring,
    );
  }
</script>

<!-- Set page title in head tag -->
<svelte:head>
  <title>{title}</title>
</svelte:head>

<!-- Render page content -->
<h1>Welcome. Current count = {$someVariableStore}</h1>

<pre>
  Current page: {$location}
  Current query: {stringify(parsedQuery)}
</pre>

<button on:click="{pop}">&lt; Back</button>
<button
  on:click="{() => {
    enableCount = !enableCount;
    if (enableCount) count();
  }}">{enableCount ? 'Disable' : 'Enable'} counter</button
>

<ul>
  <li>
    <a href="/" use:link>Home (no i reset)</a>
  </li>
  <li>
    <a href="{'/?i=5000'}" use:link>Home + reset i to 5000</a>
  </li>
  <li>
    <a href="/route-1" use:link>App 1</a>
  </li>
  <li>
    <a href="/route-1?q=Hello+World" use:link>App 1, q = 'Hello World'</a>
  </li>
  <li>
    <a href="/route-1?q=Another%20String&i=1000" use:link
      >App 1 q = 'Another String', reset i to 1000</a
    >
  </li>
  <li>
    <a href="/route-2" use:link>App 2</a>
  </li>
</ul>

<hr />

<Router
  routes="{routes}"
  on:routeLoading="{routeLoading}"
  restoreScrollState="{true}"
/>

<style>
  h1 {
    color: rgb(35, 222, 35);
  }

  pre {
    padding: 1rem;
    border: 1px solid #ddd;
    background-color: #eaeaea;
  }
</style>
