<template>
  <div>
    <div id="slogan" class="text-center">
      <h1>NameGator</h1>
      <h6 class="text-secundary">Gerador de nomes utilizando Vuejs</h6>
    </div>
    <div id="main">
      <DomainList></DomainList>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import DomainList from "./components/DomainList";

export default {
	name: "app",
	data: function () {
		return {
			prefix: "",
			sufix: "",
			prefixes: ["Air", "Jet", "Flight"],
			sufixes: ["Hub", "Station", "Mart"]
		};
	},
	components: {
		DomainList,
	}
};
</script>

<style>
  #slogan {
    margin-top: 30px;
    margin-bottom: 30px;
  }

  #main {
    background-color: #F1F1F1;
    padding-top: 30px;
    padding-bottom: 30px;
  }
</style>
