<template>
	<div class="content">
		<ul class="goodsList">
			<li class="goodsList-itme1">
				<img src="../assets/images/home-01.jpg">
			</li>
			<li class="goodsList-itme2">
				<img src="../assets/images/home-02.jpg">
			</li>
		</ul>
		<v-tabbar></v-tabbar>
	</div>
</template>
<script>
 	import vTabbar from '../components/common/Tabbar';
	export default{
		data(){
			return{

			}
		},
		components:{
			vTabbar
		}
	}
</script>
<style scoped>
	.goodsList{

	}
	.goodsList-itme1{
		width:3.75rem;
		height:2.64rem;
	}
	.goodsList-itme1 img{
		display: block;
		width: 100%;
	}
	.goodsList-itme2{
		width:3.75rem;
		height:3.75rem;
	}
	.goodsList-itme2 img{
		display: block;
		width: 100%;
	}
</style>