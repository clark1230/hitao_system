<template>
  <goods-form-detail :is-edit='false'></goods-form-detail>
</template>
<script>
import GoodsFormDetail from './components/GoodsForm'

export default {
  name: 'createForm',
  components: { GoodsFormDetail }
}
</script>
