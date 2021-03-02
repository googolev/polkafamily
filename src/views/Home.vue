<template>
  <div class="home">
    <CoinList />
  </div>
</template>

<script>
// @ is an alias to /src
import CoinList from '@/components/CoinList'

export default {
  name: 'Home',
  components: {
    CoinList
  }
}
</script>
