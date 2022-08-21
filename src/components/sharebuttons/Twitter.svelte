<script>

  import TwitterIcon from "./TwitterIcon.svelte";

  export let title; // text in Tweet
  export let url;

  const TWITTER_BLUE = '#00aced';

  const baseUrl = 'https://twitter.com/share';
  const parametersObject = {
    url,
    text: title,
  };

  const params = Object.entries(parametersObject)
  .filter(([, value]) => value ?? false)
  .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
  .join('&');

  const urlWithParameters = params === '' ? baseUrl : `${baseUrl}?${params}`;

  function handleClick() {
    const config = {
      height: 550,
      width: 400,
      location: 'no',
      toolbar: 'no',
      status: 'no',
      directories: 'no',
      menubar: 'no',
      scrollbars: 'yes',
      resizable: 'no',
      centerscreen: 'yes',
      chrome: 'yes',
    };
    return window.open(
        urlWithParameters,
        '',
        Object.keys(config)
        .map((key) => `${key}=${config[key]}`)
        .join(','),
    );
  }
</script>

<button on:click={handleClick}
><TwitterIcon
    colour={TWITTER_BLUE}
    width={48}
/></button
>

<style>
  button {
    background: transparent;
    border-style: none;
    transition: all 0.2s ease-in-out;
  }
  @media (prefers-reduced-motion: reduce) {
    button {
      transition: all 2s ease-in-out;
    }
  }

  button:focus,
  button:hover {
    transform: scale(1.1);
  }
  @media screen and (max-width: 42rem) {
    button {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
  }
</style>
