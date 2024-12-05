export default function FilterableTable(jsonDatas) {
    return {
        datas: [],
        items: [],
        perPage: null,
        currentPage: 1,
        loading: true,
        init() {
            this.perPage = parseInt(this.$el.dataset.perPage || 10);
            fetch(jsonDatas)
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
        setDatas(data) {
            this.datas = data;
            this.items = this.paginateData();
        },
        paginateData() {
            const start = (this.currentPage - 1) * this.perPage;
            return this.datas.slice(start, start + this.perPage);
        },
        totalItems() {
            return this.items.length;
        },
        updateCurrentPage(event) {
            this.currentPage = event.detail;
            this.items = this.paginateData();
        },
    }
}
