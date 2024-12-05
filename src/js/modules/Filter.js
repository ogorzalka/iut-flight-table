export default function Filter(slug, datas) {
    return {
        formTagSelector: 'input, select, textarea',
        filters: {},
        datas: [],
        slug: null,

        init() {
            this.datas = datas || [];
            this.filters = {};
            this.slug = slug;

            this.bindEvent();
            this.setupWatchers();
        },

        /*
         * Rechargement des filtres.
         */
        reload(event) {
            this.filters = event.detail.filters || {};
            this.datas = event.detail.items || [];
        },

        /*
         * Initialise les écouteurs d'évènements sur les champs de formulaire
         */
        bindEvent() {
            this.$dispatch('filter-init', slug);
            this.$el.addEventListener('change', () => {
                const selectedValue = this.$el.querySelector(this.formTagSelector).value;
                this.$dispatch('filter-applied', { key: slug, value: selectedValue });
            });
        },

        /*
         * Retourne les options possibles pour les valeurs de filtre
         */
        options() {
            return [...new Set(this.datas.map(data => data[slug]))].sort();
        },

        /*
         * Initialise les watchers pour les modifications des filtres selon les données du tableau
         */
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
