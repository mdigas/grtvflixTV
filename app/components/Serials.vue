<template>
    <Page class="page" actionBarHidden="true" >
        <ScrollView  orientation="vertical">
        <StackLayout v-if="ok" orientation="vertical">
        <GridLayout columns="50,350,*" rows="auto" >
             <Image row="0" col="0" colSpan="3" :src="'http://hbbtv.ert.gr'+seires[idx].bg_img_url" loadMode="async" horizontalAlignment="right" verticalAlignment="top" stretch="aspectFit" /> 
             <StackLayout row="0" col="0" colSpan="2" class="stdown">
                <HtmlView class="h5" :html="seires[idx].title" style="color: white;" />
                <HtmlView class="h5" :html="seires[idx].short_desc" row="0" col="0" colSpan="2" textWrap="True" style="color: white;" />
            </StackLayout>
            <StackLayout row="0" col="0" colSpan="3" class="stdown1">
                <Label text="Web Σειρές" class="h2" />
                <ScrollView orientation="horizontal">
                    <StackLayout orientation="horizontal" >
                        <GridLayout v-for="(seira, indexsw) in seiresweb" rows="200,1" columns="350" class="card" >
                            <Image row="0" col="0" :src="'http://hbbtv.ert.gr'+seira.menu_img_url" class="card" loadMode="async" stretch="aspectFill" @tap="onItemTap2(indexsw,1)" />
                            <Button row="1" col="0" :id="index" class="btnDpad" @loaded="elementLoaded($event)" @tap="onItemTap2(indexsw,1)" />
                        </GridLayout>
                    </StackLayout>
                </ScrollView> 
                <Label text="Σειρές" class="h2" />
                <ScrollView orientation="horizontal">
                    <StackLayout orientation="horizontal" >
                        <GridLayout v-for="(seira, indexs) in seires" rows="200,1" columns="350" class="card" >
                            <Image row="0" col="0" :src="'http://hbbtv.ert.gr'+seira.menu_img_url" class="card" loadMode="async" stretch="aspectFill" @tap="onItemTap2(indexs,2)" />
                            <Button row="1" col="0" :id="index" class="btnDpad" @loaded="elementLoaded($event)" @tap="onItemTap2(indexs,2)" />
                        </GridLayout>
                    </StackLayout>
                </ScrollView>   
            </StackLayout>             
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
            onItemTap2: function(args, no) {
                var seira = "";
                switch(no) {
                    case 1: 
                        seira = this.seiresweb[args];
                        break;
                    case 2:
                        seira = this.seires[args];
                        break;                        
                    };
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
                        seira: seira
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
                this.seires = response.content.toJSON().services.filter(function (chain) {
                        return chain.masterCategory === "TV &Sigma;&epsilon;&iota;&rho;&#941;&sigmaf;";})[0].items;
                this.seiresweb = response.content.toJSON().services.filter(function (chain) {
                        return chain.masterCategory === "Web &Sigma;&epsilon;&iota;&rho;&#941;&sigmaf;";})[0].items;
                this.idx = Math.floor(Math.random() * this.seires.length);
                this.ok = true;
                }, error => {
                console.error(error);
                });
              
        },        
        data() {
            return {
                seires: [],
                seiresweb: [],
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
