<template>
    <Page class="page" actionBarHidden="true" >
        <ScrollView  orientation="vertical">
        <StackLayout v-if="ok" orientation="vertical">
        <GridLayout columns="50,450,*,*" rows="*,*,auto" >
             <Image row="0" col="0" colSpan="4" rowSpan="3" :src="'http://hbbtv.ert.gr'+sports[idx].bg_img_url" loadMode="async"horizontalAlignment="right" verticalAlignment="top" stretch="aspectFit"  /> 
             <StackLayout row="1" col="1" colSpan="2" >
                <HtmlView :class="'h2-w'+$width" :html="sports[idx].title" />
                <HtmlView :class="'h3-w'+$width" :html="sports[idx].short_desc" textWrap="True" />
            </StackLayout>
            <ScrollView orientation="horizontal" row="2" col="0" colSpan="4" >
                <StackLayout orientation="horizontal" >
                    <GridLayout v-for="(seira, indexs) in sports" :rows="episode_rows" :columns="episode_col" class="card" >
                        <Button row="0" col="0" class="btnDpad" :width="photo_width" :height="photo_width" :backgroundImage="'http://hbbtv.ert.gr'+seira.menu_img_url" @loaded="elementLoaded($event)" @tap="onItemTap2(indexs)" />
                    </GridLayout>
                </StackLayout>
            </ScrollView>
        </GridLayout> 
        </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import * as http from "http";

    export default {
        methods: {
            elementLoaded(args) {
                const view = args.object;
                view.android["jsview"] = args.object;
              
            },
            onItemTap2: function(args) {
                console.log("Item with index: " + args + " tapped");
                this.$goto('Seires', {
                    animated: true,
                    transition: {
                        name: "slideLeft",
                        duration: 250,
                        curve: "easeIn"},
                    transitioniOS: {},
                    transitionAndroid: {},
                    props: {
                        seira: this.sports[args]
                    }
                });
            },
        },
        created: function() {
            switch(this.$width) {
                case 1280: 
                    this.episode_rows ='147';
                    this.episode_col ='273';
                    this.photo_width='273';
                    this.photo_height='147';
                    break;
                case 1920:
                    this.episode_rows ='194';
                    this.episode_col ='346';
                    this.photo_width='346';
                    this.photo_height='194';                    
                    break;
                case 3840:
                    this.episode_rows ='221';
                    this.episode_col ='410';
                    this.photo_width='410';
                    this.photo_height='221';                    
                    break;
                    };
            var url2="http://hbbtv.ert.gr/pub/smarttv/ert/feed_NewLayout.php";

            http.request({
                url: url2,
                method: "GET",
                }).then(response => {
                this.sports = response.content.toJSON().services.filter(function (chain) {
                        return chain.id === "25";})[0].items;
                this.idx = Math.floor(Math.random() * this.sports.length);
                this.ok = true;
                }, error => {
                console.error(error);
                });
              
        },        
        data() {
            return {
                sports: [ ],
                idx: 0,
                ok: false,
                episode_rows: '',
                episode_col: '',
                photo_width: '',
                photo_height: '',                   
            };
        }
    };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '~@nativescript/theme/scss/variables/blue';
    // End custom common variables

    // Custom styles
</style>
