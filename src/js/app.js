import Alpine from "alpinejs";
import FilterableTable from "./modules/FilterableTable";
import Pagination from "./modules/Pagination";

window.alpine = Alpine;
Alpine.data('FilterableTable', FilterableTable);
Alpine.data('Pagination', Pagination);
Alpine.start();
