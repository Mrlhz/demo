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
      <el-table-column label="ID" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="名称" width="400" />
      <el-table-column prop="year" label="年份" width="60" align="center" />
      <el-table-column label="类型">
        <template slot-scope="{row}">
          <div class="tag-group">
            <el-tag v-for="tag in row.genres" :key="tag" size="medium">{{ tag }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="rating.average" label="评分" width="60" align="center" />
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
import { getMovie } from '@/api/movie'
import Pagination from '@/components/Pagination'

export default {
  name: 'Movies',
  components: { Pagination },
  data() {
    return {
      listLoading: true,
      page: 1,
      limit: 20,
      total: 0
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
      const { movies, total } = getMovie(params)
      this.list = movies
      this.total = total
      this.listLoading = false
    }
  }
}
</script>

<style lang="scss">
  .tag-group span{
    margin-left: 5px;
  }
</style>
