import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";

import DomainList from "./components/DomainList.vue";
import DomainView from "./components/DomainView.vue";

Vue.use(VueRouter);

const router = new VueRouter({
	routes: [
		{
			path: "/",
			redirect: "/domains"
		},
		{
			path: "/domains",
			component: DomainList
		},
		{
			path: "/domains/:domain",
			component: DomainView
		}
	]
});

Vue.config.productionTip = false;

new Vue({
	router,
	render: h => h(App),
}).$mount("#app");
