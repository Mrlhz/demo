
const { books, total } = require('D:/web/myblog/puppeteer/data/books/books-编程.min.json')

export function getBook(params = {}) {
  const { page = 1, limit = 20 } = params
  const list = books.map((book) => {
    if (book.rating === 0) {
      book.rating = '暂无评分'
    }
    return book
  })
  return {
    total,
    books: list.slice((page - 1) * limit, page * limit)
  }
}
