<script>
  import { link } from 'svelte-spa-router';
</script>

<div>
  <h2>Route 2</h2>
  <h3>More content</h3>
  <a href="/" use:link>Home</a>
</div>

<style>
  h3 {
    margin-top: 100vh;
  }
</style>
