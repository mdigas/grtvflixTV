<template>
    <Page class="page" actionBarHidden="true" >
        <ScrollView  orientation="vertical">
        <StackLayout v-if="ok" orientation="vertical">
        <GridLayout columns="50,350,*" rows="auto" >
             <Image row="0" col="0" colSpan="3" :src="'http://hbbtv.ert.gr'+sports[idx].bg_img_url" loadMode="async"horizontalAlignment="right" verticalAlignment="top" stretch="aspectFit"  /> 
             <StackLayout row="0" col="0" colSpan="2" class="stdown">
                <HtmlView class="h5" :html="sports[idx].title" style="color: white;" />
                <HtmlView class="h5" :html="sports[idx].short_desc" row="0" col="0" colSpan="2" textWrap="True" style="color: white;" />
            </StackLayout>
            <ScrollView orientation="horizontal" row="0" col="0" colSpan="3" class="stdown1">
                <StackLayout orientation="horizontal" >
                    <GridLayout v-for="(seira, indexs) in sports" rows="147" columns="273" class="card" >
                        <Button row="0" col="0" class="btnDpad" width="273" height="147" :backgroundImage="'http://hbbtv.ert.gr'+seira.menu_img_url" @loaded="elementLoaded($event)" @tap="onItemTap2(indexs)" />
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
