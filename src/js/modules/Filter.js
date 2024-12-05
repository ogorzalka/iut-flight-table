export default function Filter(slug, datas) {
    return {
        filters: {},
        datas: [],
        init() {
            this.datas = datas || [];
            this.filters = {};

            this.bindEvent();
        },
        reload(event) {
            console.log('Event reçu dans Filter:', event.detail); // Debug
            this.filters = event.detail.filters || {};
            this.datas = event.detail.items || [];
        },
        bindEvent() {
            this.$dispatch('filter-init', slug);
            this.$el.addEventListener('change', () => {
                const selectedValue = this.$el.querySelector('input, select, textarea').value;
                this.$dispatch('filter-applied', { key: slug, value: selectedValue });
            });
        },
        options() {
            return [...new Set(this.datas.map(data => data[slug]))].sort();
        },
    }
}
