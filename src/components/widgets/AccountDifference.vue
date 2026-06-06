<template>
    <div class="AccountDifference" style="grid-area: AccountDifference;">
        <h1>${{ addCommasToNumber(item.numberToday - item.numberYesterday) }}</h1>
    </div>
</template>
  
<script>
export default {
    props: {
        item: Object,
        assets: Object,
        addCommasToNumber: Function,
    },
}
</script>
  
<style scoped>
.AccountDifference {
    padding: 0 20px;
    display: grid;
    align-items: center
}
</style>
  