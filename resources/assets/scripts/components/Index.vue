<template>
	<div>
		<h2>Index</h2>
		<router-link to="/about">Acerca de esta paginas</router-link>
		<p>{{ count }}</p>
		<input type="button" value="incrementa" @click.prevent="increment">
		<md-button>Default</md-button>
	</div>
</template>

<script>
export default {
	name: 'Index',
	computed: {
		count: function() {
			return this.$store.state.count
		}
	},
	methods: {
		increment: function() {
			this.$store.commit('increment')
		}
	},
	created() {
		
		console.log(this.$store.state.count)
	}
}
</script>

<style>

</style>
