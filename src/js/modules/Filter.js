export default function Filter(slug, datas) {
    return {
        datas: [],
        init() {
            this.datas = datas;
        },
        options() {
            return [...new Set(this.datas.map(data => data[slug]))].sort();
        },
    }
}
