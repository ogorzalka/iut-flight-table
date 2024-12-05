export default function Pagination(totalItems, currentPage, perPage) {
    return {
        totalItems,
        currentPage,
        perPage,
        totalPages() {
            return Math.ceil(this.totalItems / this.perPage);
        },
        goToPage(page) {
            this.$dispatch('page-changed', page);
        },
    }
}
