import Alpine from "alpinejs";
import FilterableTable from "./modules/FilterableTable";

window.alpine = Alpine;
Alpine.data('FilterableTable', FilterableTable)
Alpine.start();
