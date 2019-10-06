<template>
  <div class="app-container">
    <!-- filter -->
    <div class="filter-container">
      <el-input class="filter-item" style="width:200px" placeholder="名称" v-model="queryParameter.title" @keyup.enter.native="handleFilter" />
      <el-select class="filter-item" v-model="queryParameter.tag" clearable placeholder="类型">
        <el-option v-for="tag in tagTypeOptions" :key="tag.key" :label="tag.value" :value="tag.value" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
    </div>
    <!-- filter end -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="ID" width="100px" align="center">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="名称" width="400" />
      <el-table-column prop="rating" label="评分" width="60" align="center" />
      <el-table-column prop="year" label="年份" width="60" align="center" />
      <el-table-column label="类型" width="400">
        <template slot-scope="{row}">
          <div class="tag-group">
            <el-tag v-for="tag in row.genres" :key="tag" size="medium">{{ tag }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="rating.average" label="操作" align="center">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleDetails(row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParameter.page"
      :limit.sync="queryParameter.limit"
      @pagination="fetchData"
    />

    <el-dialog title="电影详情" :visible.sync="dialogTableVisible">
      <div>{{ dialogTable.title }}</div>
    </el-dialog>
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
      list: [],
      total: 0,
      dialogTableVisible: false,
      dialogTable: {},
      queryParameter: {
        page: 1,
        limit: 20,
        title: '',
        tag: ''
      },
      tagTypeOptions: []
    }
  },
  computed: {},
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      const { movies, total, tags } = getMovie(this.queryParameter)
      this.list = movies
      this.total = total
      this.tagTypeOptions = tags
      this.listLoading = false
    },
    handleDetails(row) {
      this.dialogTableVisible = true
      console.log(Object.keys(row))
      this.dialogTable = {
        title: row.title
      }
    },
    handleFilter() {
      const params = this.queryParameter
      const { page, title, tag } = params
      console.log(page, title, tag)
      this.fetchData()
    }
  }
}
</script>

<style lang="scss">
  .tag-group span{
    margin-left: 5px;
  }

  .filter-container {
    padding-bottom: 10px;
    .filter-item {
      display: inline-block;
      vertical-align: middle;
      margin-bottom: 10px;
    }
  }
</style>
