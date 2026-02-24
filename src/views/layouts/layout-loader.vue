<template>
    <div id="global-loader" ref="preloader">
        <div class="page-loader"></div>
    </div>
</template>
<script>
export default {
    mounted() {
        // Your JavaScript code goes here
        this.setupPreloader();
    },
    methods: {
        setupPreloader() {
            setTimeout(() => {
                const preloader = this.$refs.preloader;
                if (preloader) {
                    preloader.style.transition = "opacity 200ms linear";
                    preloader.style.opacity = "0";
                    setTimeout(() => {
                        preloader.style.display = "none";
                        if (preloader.parentNode) {
                            preloader.parentNode.removeChild(preloader);
                        }
                    }, 200);
                }
            }, 50);
        }
    }
}
</script>