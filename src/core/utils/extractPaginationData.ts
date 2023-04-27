export default function extractPaginationData({ total: count, total_pages: totalPages, page, per_page: perPage }) {
  return {
    page,
    perPage,
    count,
    totalPages: totalPages ?? Math.ceil(count / perPage),
  };
}
