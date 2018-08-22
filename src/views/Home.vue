<template>
	<div class="home">
		<!-- <img alt="Vue logo" src="@/assets/logo.png"> -->
		<div>我是首页</div>
		<HelloWorld msg="Welcome to Your Vue.js App" />
	</div>
</template>

<script>
	// @ is an alias to /src
	import HelloWorld from '@/components/HelloWorld.vue'
	import * as THREE from 'three'
	import * as TWEEN from 'tween'
	export default {
		name: 'home',
		components: {
			HelloWorld
		},
		// beforeRouteEnter (to, from, next) {
		// 	next({
		// 		path: '/login',
		// 		query: { redirect: to.fullPath }//把要跳转的地址作为参数传到下一步
		// 	})
		// },
	}
			var scene = new THREE.Scene();
			var camera = new THREE.PerspectiveCamera( 100, window.innerWidth/window.innerHeight, 0.1, 1000 );

			var renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth/3, window.innerHeight/3 );
			document.body.appendChild( renderer.domElement );

			var geometry = new THREE.BoxGeometry( 1, 1, 1 );
			var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			var cube = new THREE.Mesh( geometry, material );
			scene.add( cube );

			camera.position.z = 5;

			var animate = function () {
				requestAnimationFrame( animate );

				cube.rotation.x += 0.01;
				cube.rotation.y += 0.01;

				renderer.render( scene, camera );
			};

			animate();
</script>

