<template>
  <div>
     <iframe :src="host" width="100%" height="850px" 
       frameborder="0"></iframe>
  </div>  
</template>
<script>
export default {
  data() {
    return {
      host: null
    }
  },
  created() {
    this.host = this.api.druidMonitor
  },
}
</script>
