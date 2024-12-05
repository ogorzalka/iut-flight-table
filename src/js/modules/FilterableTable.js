export default function FilterableTable(jsonDatas) {
    return {
        datas: [],
        perPage: null,
        init() {
            this.perPage = parseInt(this.$el.dataset.perPage || 10);
            fetch(jsonDatas)
                .then(response => response.json())
                .then(data => this.setDatas(data))
                .catch(error => console.error('Erreur de chargement:', error));
        },
        setDatas(data) {
            this.datas = data;
        },
    }
}
