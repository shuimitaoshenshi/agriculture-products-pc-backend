<template>
  <div>
    <div style="margin-bottom: 15px">Your roles: {{ roles }}</div>
    Switch roles:
    <el-radio-group v-model="switchRoles">
      <el-radio-button label="editor" />
      <el-radio-button label="admin" />
      <el-radio-button label="super" />
      <el-radio-button label="first" />
      <el-radio-button label="second" />
      <el-radio-button label="third" />
      <el-radio-button label="shelf" />
    </el-radio-group>
  </div>
</template>

<script>
export default {
  computed: {
    roles() {
      return this.$store.getters.roles
    },
    switchRoles: {
      get() {
        return this.roles[0]
      },
      set(val) {
        console.log(val)
        this.$store.dispatch('user/changeRoles', val).then(() => {
          this.$emit('change')
        })
      }
    }
  }
}
</script>
