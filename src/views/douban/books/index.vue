<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="ID" width="80">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="书名" width="280" />
      <el-table-column prop="pubdate" label="出版日期" width="180" />
      <el-table-column prop="rating" label="评分" />
      <el-table-column prop="series" label="简介" />
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="page"
      :limit.sync="limit"
      @pagination="fetchData"
    />
  </div>
</template>

<script>
import { getBook } from '@/api/book'
import Pagination from '@/components/Pagination'

export default {
  name: 'Books',
  components: { Pagination },
  data() {
    return {
      listLoading: true,
      page: 1,
      limit: 20,
      total: 0,
      value5: 3.7
    }
  },
  computed: {},
  created() {
    this.fetchData({
      page: this.page,
      limit: this.limit
    })
  },
  methods: {
    fetchData(params) {
      this.listLoading = true
      const { books, total } = getBook(params)
      this.list = books
      this.total = total
      this.listLoading = false
    },
    rate(val) {
      return val / 2
    }
  }
}
</script>

<style lang="scss">
  .block {
    padding: 15px 0;
  }
</style>

