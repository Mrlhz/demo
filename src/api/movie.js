const { subjects, total } = require('D:/books/mdn/data/movie.json')

const tags = ['剧情', '喜剧', '动作', '爱情', '科幻', '动画', '悬疑', '惊悚', '恐怖', '犯罪', '同性', '音乐', '歌舞', '传记', '历史', '战争', '西部', '奇幻', '冒险', '灾难', '武侠', '情色']

export function getMovie(params = {}) {
  const { page = 1, limit = 20 } = params
  return {
    tags,
    total,
    movies: subjects.slice((page - 1) * limit, page * limit)
  }
}
