const ghpages = require('gh-pages');

ghpages.publish(
  'public', // path to public directory
  {
    branch: 'gh-pages',
    repo: 'https://github.com/eelke/svelte-spa-router-sticky.git',
    user: {
      name: 'Eelke Feenstra',
      email: 'dev@eelke.net',
    },
    dotfiles: true,
  },
  () => {
    console.log('Deploy Complete!');
  },
);
