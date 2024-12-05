export default function FilterableTable(jsonDatas) {
    return {
        datas: [],
        init() {
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
