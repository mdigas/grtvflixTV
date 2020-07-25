<template>
    <Page class="page" actionBarHidden="true" >
        <ScrollView  orientation="vertical">
        <StackLayout v-if="ok" orientation="vertical">
        <GridLayout columns="50,350,*" rows="auto" >
             <Image row="0" col="0" colSpan="3" :src="'http://hbbtv.ert.gr'+paidika[idx].bg_img_url" loadMode="async" horizontalAlignment="right" verticalAlignment="top" stretch="aspectFit"  /> 
             <StackLayout row="0" col="0" colSpan="2" class="stdown">
                <HtmlView class="h4" :html="paidika[idx].title" style="color: white;" />
                <HtmlView class="h4" :html="paidika[idx].short_desc" row="0" col="0" colSpan="2" textWrap="True" style="color: white;" />
            </StackLayout>
                <StackLayout row="0" col="0" colSpan="3" class="stdown1">
                    <Label text="Παιδικά" class="h2" />                        
                    <ScrollView orientation="horizontal">
                        <StackLayout orientation="horizontal" >
                            <GridLayout v-for="(paid, index) in paidika" rows="194" columns="346" class="card"  >
                                <Button row="0" col="0" :id="'c'+index" class="btnDpad" width="346" height="194" :backgroundImage="'http://hbbtv.ert.gr'+paid.menu_img_url" @loaded="elementLoaded($event)" @tap="onItemTap(index, 1)" />
                            </GridLayout>
                        </StackLayout>
                    </ScrollView>   
                    <Label text="Μένουμε σπίτι" class="h2" />                        
                    <ScrollView orientation="horizontal">
                        <StackLayout orientation="horizontal" >
                            <GridLayout v-for="(mn, index) in mensp" rows="194" columns="346" class="card" >
                                <Button row="1" col="0" class="btnDpad"  width="346" height="194" :backgroundImage="'http://hbbtv.ert.gr'+mn.menu_img_url" @loaded="elementLoaded($event)"  @tap="onItemTap(index, 2)" />
                            </GridLayout>
                        </StackLayout>
                    </ScrollView>   
                    <Label text="Ιστορίες" class="h2" />                        
                    <ScrollView orientation="horizontal">
                        <StackLayout orientation="horizontal" >
                            <GridLayout v-for="(ist, index) in istories" rows="194" columns="346" class="card"  >
                                <Button row="1" col="0" class="btnDpad"  width="346" height="194" :backgroundImage="'http://hbbtv.ert.gr'+ist.menu_img_url" @loaded="elementLoaded($event)" @tap="onItemTap(index, 3)" />
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
            onItemTap: function(args, no) {
                var seira = "";
                switch(no) {
                    case 1: 
                        seira = this.paidika[args];
                        break;
                    case 2:
                        seira = this.mensp[args];
                        break;
                    case 3:
                        seira = this.istories[args];
                        break;
                    };
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
                this.paidika = response.content.toJSON().services.filter(function (chain) {
                        return chain.masterCategory === "&Delta;&iota;&alpha;&sigma;&kappa;&#941;&delta;&alpha;&sigma;&eta;";})[0].items;
                this.mensp = response.content.toJSON().services.filter(function (chain) {
                        return chain.masterCategory === "&Mu;&alpha;&theta;&alpha;&#943;&nu;&omicron;&upsilon;&mu;&epsilon; &sigma;&tau;&omicron; &sigma;&pi;&#943;&tau;&iota;";})[0].items;
                this.istories = response.content.toJSON().services.filter(function (chain) {
                        return chain.masterCategory === "&Iota;&sigma;&tau;&omicron;&rho;&#943;&epsilon;&sigmaf; &gamma;&iota;&alpha; &pi;&alpha;&iota;&delta;&iota;&#940;";})[0].items;
                this.idx = Math.floor(Math.random() * this.paidika.length);
                this.ok = true;
                }, error => {
                console.error(error);
                });
              
        },        
        data() {
            return {
                paidika: [ ],
                mensp: [],
                istories: [],
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
