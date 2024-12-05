export default function Filter(slug, datas) {
    return {
        formTagSelector: 'input, select, textarea',
        filters: {},
        datas: [],
        init() {
            this.datas = datas || [];
            this.filters = {};

            this.bindEvent();
            this.setupWatchers();
        },
        reload(event) {
            this.filters = event.detail.filters || {};
            this.datas = event.detail.items || [];
        },
        bindEvent() {
            this.$dispatch('filter-init', slug);
            this.$el.addEventListener('change', () => {
                const selectedValue = this.$el.querySelector(this.formTagSelector).value;
                this.$dispatch('filter-applied', { key: slug, value: selectedValue });
            });
        },
        options() {
            return [...new Set(this.datas.map(data => data[slug]))].sort();
        },
        setupWatchers() {
            this.$watch('filters', value => {
                const select = this.$el.querySelector(this.formTagSelector);
                if (select) {
                    select.value = value[slug] || '';
                }
            });

            this.$watch('datas', () => {
                const select = this.$el.querySelector(this.formTagSelector);
                if (select) {
                    select.value = this.filters[slug] || '';
                }
            });
        }
    }
}
