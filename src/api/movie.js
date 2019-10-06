const { subjects, total } = require('D:/web/myblog/puppeteer/data/movie/top250.json')

let tags = ['剧情', '喜剧', '动作', '爱情', '科幻', '动画', '悬疑', '惊悚', '恐怖', '犯罪', '同性', '音乐', '歌舞', '传记', '历史', '战争', '西部', '奇幻', '冒险', '灾难', '武侠', '情色']

tags = tags.map((tag, index) => {
  return { key: 'tag' + index, value: tag }
})

export function getMovie(params = {}) {
  const { page = 1, limit = 20, title = '', tag = '' } = params
  let movies = []
  let count = 0

  if (title) {
    movies = subjects.filter((item) => {
      return item.title.indexOf(title) !== -1
    })
    count = movies.length
  } else if (!title && tag) {
    movies = subjects.filter((item) => {
      return item.genres.indexOf(tag) !== -1
    })
    count = movies.length
  } else {
    movies = subjects
    count = total
  }
  return {
    tags,
    total: count,
    movies: movies.slice((page - 1) * limit, page * limit)
  }
}
