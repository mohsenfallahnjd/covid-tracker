import CountrySelection from "../views/CountrySelection.vue";
import HomePage from "../views/HomePage.vue";
import SplashScreen from "../views/SplashScreen.vue";
import TopTenPage from "../views/TopTenPage.vue";
import WorldStatistics from "../views/WorldStatistics.vue";

const routes = [{
        path: "/",
        name: "SplashScreen",
        component: SplashScreen
    },
    {
        path: "/CountrySelection",
        name: "CountrySelection",
        component: CountrySelection
    },
    {
        path: "/HomePage",
        name: "HomePage",
        component: HomePage
            // // route level code-splitting
            // // this generates a separate chunk (about.[hash].js) for this route
            // // which is lazy-loaded when the route is visited.
            // component: () =>
            //   import(/* webpackChunkName: "about" */ "../views/About.vue"),
    },
    {
        path: "/TopTenPage",
        name: "TopTenPage",
        component: TopTenPage
    },
    {
        path: "/WorldStatistics",
        name: "WorldStatistics",
        component: WorldStatistics
    }
];

export default routes;