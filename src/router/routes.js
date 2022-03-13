import CountrySelection from "../views/CountrySelection.vue";
import HomePage from "../views/HomePage.vue";
import TopTenPage from "../views/TopTenPage.vue";
import WorldStatistics from "../views/WorldStatistics.vue";
import AllCountry from "../views/AllCountry.vue";

const routes = [{
        path: "/",
        name: "HomePage",
        component: HomePage,
    },
    {
        path: "/CountrySelection",
        name: "CountrySelection",
        component: CountrySelection,
    },
    {
        path: "/TopTenPage",
        name: "TopTenPage",
        component: TopTenPage,
    },
    {
        path: "/WorldStatistics",
        name: "WorldStatistics",
        component: WorldStatistics,
    },
    {
        path: "/AllCountry",
        name: "AllCountry",
        component: AllCountry,
    },
];

export default routes;