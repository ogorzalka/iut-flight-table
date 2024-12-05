import Alpine from "alpinejs";
import FilterableTable from "./modules/FilterableTable";
import Pagination from "./modules/Pagination";
import Filter from "./modules/Filter.js";

window.alpine = Alpine;
Alpine.data('FilterableTable', FilterableTable);
Alpine.data('Pagination', Pagination);
Alpine.data('Filter', Filter);
Alpine.start();
