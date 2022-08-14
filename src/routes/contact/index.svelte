<script lang="ts">
  import { page } from "$app/stores";
  import ContactForm from "../../components/contact/ContactForm.svelte";

</script>

<h1>Please get in touch!</h1>

<p>brdr's power is in the community. In order for brdr to become more powerful, it could really do
with a little help from its friends.</p>

<br/>
<br/>

<p>If you think you could help, please get in touch using the form below!</p>

<ContactForm endpoint={$page.url.pathname}/>

<style>
  h1 {
    text-align: center;
    padding: 10px;
  }

  p {
    padding: 10px;
  }
</style>
