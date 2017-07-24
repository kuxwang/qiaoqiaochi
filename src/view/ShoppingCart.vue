<template>
	<div>
		<mt-header title="购物车">
		  <router-link to="/" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		</mt-header>
	</div>
</template>
<script>
	import { Header,Checklist } from 'mint-ui';
</script>
<style scoped>
	.mint-header{
		background: #fff;
		color:#252525;
		border-bottom: 1px solid #e3e3e3;
		font-size:0.16rem;
	}
	.router-link-active{
		color:#666;
	}
</style>