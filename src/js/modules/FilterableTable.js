export default function FilterableTable(jsonFile) {
    return {
        datas: [],
        items: [],
        perPage: null,
        currentPage: 1,
        loading: true,
        init() {
            this.paginationInit();
            this.fetchDatas(jsonFile);
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
            this.items = this.paginateData();
        },

        /*
         * Retourne le tableau d'élément filtré selon la page courante
         */
        paginateData() {
            const start = (this.currentPage - 1) * this.perPage;
            return this.datas.slice(start, start + this.perPage);
        },

        /*
         * Retourne le nombre total d'items dans la liste
         */
        totalItems() {
            return this.datas.length;
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
