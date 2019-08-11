<!--
 * @Description: 
 * @Author: Retric
 * @Github: https://github.com/RetricSu
 * @Date: 2019-08-10 15:18:14
 * @LastEditors: Retric
 * @LastEditTime: 2019-08-10 23:46:59
 -->
<template>
    <div class="modal">
        <DemoLoginModal></DemoLoginModal>
    </div>
</template>

<script>
import DemoLoginModal from './sections/modals/settingModal';

export default {
    name:'setting',
    components:{
        DemoLoginModal
    },
    mounted() {
        this.$modal.show('demo-login');
    },
}
</script>

<style scoped>
    .modal{
        -webkit-app-region: drag;
    }
</style>