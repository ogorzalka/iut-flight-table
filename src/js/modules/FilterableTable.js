export default function FilterableTable(jsonFile) {
    return {
        datas: [],
        filteredDatas: [],
        items: [],
        filter: [],
        filters: [],
        perPage: null,
        currentPage: 1,
        loading: true,
        init() {
            this.paginationInit();
            this.fetchDatas(jsonFile);
        },

        /*
         * Re-initialise les valeurs de filtres.
         */
        resetFilters() {
            this.filter = [];
            this.updateItems();
        },

        /*
         * Initialise les différents filtres
         */
        filterInit(event) {
            this.filters.push(event.detail);
        },

        /*
         * Initialise les paramètres de pagination
         */
        paginationInit() {
            this.perPage = parseInt(this.$el.dataset.perPage || 10);
        },

        /*
         * Initialise les données avec le JSON fourni
         */
        fetchDatas(file) {
            fetch(file)
                .then(response => response.json())
                .then(data => {
                    this.setDatas(data);
                    this.loading = false;
                })
                .catch(error => {
                    console.error('Erreur de chargement:', error);
                    this.loading = false;
                });
        },

        /*
         * Initialiser les tableaux de données
         */
        setDatas(data) {
            this.datas = data;
            this.filteredDatas = this.datas;
            this.items = this.paginateData();
        },

        /*
         * Retourne le tableau d'éléments filtré selon les filtres
         */
        filterData() {
            return this.datas.filter(data =>
                this.filters.every(key => {
                    const filterValue = this.filter[key] || false;
                    const dataValue = data[key];
                    return !filterValue || dataValue === filterValue;
                })
            );
        },

        /*
         * Retourne le tableau d'élément filtré selon la page courante
         */
        paginateData() {
            const start = (this.currentPage - 1) * this.perPage;
            return this.filteredDatas.slice(start, start + this.perPage);
        },

        /*
         * Retourne le nombre total d'items dans la liste
         */
        totalItems() {
            return this.filteredDatas.length;
        },

        /*
         * Met à jour les filtres et les éléments affichés
         */
        updateFilters(event) {
            this.filter[event.detail.key] = event.detail.value;
            this.currentPage = 1;
            this.updateItems();
        },

        /*
         * Met à jour la liste des éléments selon les filtres et page appliqués
         */
        updateItems() {
            this.filteredDatas = this.filterData();
            this.items = this.paginateData();

            // Émet l'événement 'result-updated' avec le nombre de résultats
            this.$dispatch('items-updated', {
                totalItems: this.totalItems(),
                items: this.filteredDatas,
                perPage: this.perPage,
                currentPage: this.currentPage,
                filters: this.filter,
            });
        },

        /*
         * Met à jour pour définir la page courante et mettre à jour les éléments affichés
         */
        updateCurrentPage(event) {
            this.currentPage = event.detail;
            this.items = this.paginateData();
        },
    }
}
