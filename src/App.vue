<script setup lang="ts">
import { getInstance } from "./LockPlugin";
import { Web3Provider } from "@ethersproject/providers";

const auth = getInstance();

async function login() {
  await auth.login("walletconnect");
  if (auth.provider.value !== null) {
    const web3 = new Web3Provider(auth.provider.value, "any");
    console.log(
      "🚀 ~ file: App.vue ~ line 11 ~ login ~ auth.web3.listAccounts()",
      await web3.listAccounts()
    );
  }
}
</script>

<template>
  <button @click="login">Test</button>
</template>
