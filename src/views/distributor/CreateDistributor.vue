<template>
  <div class="createDistributor-container">
    <el-form ref="form" :model="form" label-width="80px" style="width: 500px">
      <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="级别">
        <el-select v-model="form.level" placeholder="请选择级别">
          <el-option
            v-for="(item, index) in subordinate"
            :key="index"
            :label="item.label"
            :value="item.val"
          ></el-option>
          <!-- <el-option label="区域二" value="beijing"></el-option> -->
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        phone: '',
        level: ''
      },
      // subordinate:[]
      subordinate: [
        {
          label: '一级',
          val: 'first'
        },
        {
          label: '二级',
          val: 'second'
        },
        {
          label: '三级',
          val: 'third'
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>

<style>
.createDistributor-container {
  margin-top: 10px;
}
</style>
