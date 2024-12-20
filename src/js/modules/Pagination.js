export default function Pagination(totalItems, currentPage, perPage) {
    return {
        totalItems,
        currentPage: 1,
        perPage,
        init() {
            this.currentPage = currentPage;
        },

        /*
         * Rechargement de la pagination lors de la modification
         * du nombre d'éléments du composant parent
         */
        reload(event) {
          this.totalItems = event.detail.totalItems;
        },

        /*
         * Récupère le nombre de pages total
         */
        totalPages() {
            return Math.ceil(this.totalItems / this.perPage);
        },
        /*
         * Permet d'accéder à redéfinir le numéro de page courante
         * et transmet un évènement au composant parent
         */
        goToPage(page) {
            this.currentPage = page;
            this.$dispatch('page-changed', page);
        },
    }
}
