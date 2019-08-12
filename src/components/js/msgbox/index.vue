<template>
	<div class="msgbox">
		<div class="content">
			<!--<p>{{title}}</p>-->
			<p>{{content}}</p>
		</div>
		<div class="btns">
			<span @click="cancelFn">{{cancelT}}</span>
			<span @click="confirmFn">{{confirmT}}</span>
		</div>
	</div>
</template>

<script>
</script>

<style scoped>
	.msgbox{position: fixed;top: 40%;left: 50%;width:66%;transform: translate(-50%,-50%);text-align: center;border-radius: 10px;background: #fff;border: 1px solid #ddd;}
	.content{
		    padding: 1.5rem 0 1.5rem;
    border-bottom: 1px solid #f6f6f6;
    .content p{margin-top: 1.5rem;}
	}
	.btns{display: flex;height: 2.5rem;line-height: 2.5rem;text-align: center;justify-content: space-between;}
	span{display: inline-block;width: 50%;}
	.btns span{border-right: 1px solid #ddd;}
</style>