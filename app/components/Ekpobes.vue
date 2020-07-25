<template>
    <Page class="page"  actionBarHidden="true" >
        <ScrollView  orientation="vertical">
        <StackLayout v-if="ok" orientation="vertical">
        <GridLayout columns="50,350,*" rows="auto" >
             <Image row="0" col="0" colSpan="3" :src="'http://hbbtv.ert.gr'+documentaries[idx].bg_img_url" loadMode="async" horizontalAlignment="right" verticalAlignment="top" stretch="aspectFit" /> 
             <StackLayout row="0" col="0" colSpan="2" class="stdown">
                <HtmlView class="h5" :html="documentaries[idx].title" style="color: white;" />
                <HtmlView class="h5" :html="documentaries[idx].short_desc" row="0" col="0" colSpan="2" textWrap="True" style="color: white;" />
            </StackLayout>
            <StackLayout row="0" col="0" colSpan="3" class="stdown1">
            <Label text="Ξένα Ντοκιμαντέρ" class="h2" />
            <ScrollView orientation="horizontal">
                <StackLayout orientation="horizontal" >
                    <GridLayout v-for="(doc, index) in documentaries" rows="194" columns="346" class="card" >
                        <Button row="0" col="0" class="btnDpad" width="346" height="194" :backgroundImage="'http://hbbtv.ert.gr'+doc.menu_img_url" @loaded="elementLoaded($event)" @tap="onItemTap(index, 1)" />
                    </GridLayout>
                </StackLayout>
            </ScrollView>
            <Label text="Ελληνικά Ντοκιμαντέρ" class="h2" />
            <ScrollView orientation="horizontal">
                <StackLayout orientation="horizontal" >
                    <GridLayout v-for="(eldoc, index) in eldocumentaries" rows="194" columns="346" class="card"  >
                        <Button row="0" col="0" class="btnDpad" width="346" height="194" :backgroundImage="'http://hbbtv.ert.gr'+eldoc.menu_img_url" @loaded="elementLoaded($event)" @tap="onItemTap(index, 4)" />                        
                    </GridLayout>
                </StackLayout>
            </ScrollView>            
            <Label text="Ψυχαγωγία" class="h2" />
            <ScrollView orientation="horizontal">
                <StackLayout orientation="horizontal" >
                    <GridLayout v-for="(doc, index) in entertmns" rows="194" columns="346" class="card" >
                        <Button row="0" col="0" class="btnDpad" width="346" height="194" :backgroundImage="'http://hbbtv.ert.gr'+doc.menu_img_url" @loaded="elementLoaded($event)"  @tap="onItemTap(index, 2)" />                        
                    </GridLayout>
                </StackLayout>
            </ScrollView>
            <Label text="Συνεντεύξεις" class="h2" />
            <ScrollView orientation="horizontal">
                <StackLayout orientation="horizontal" >
                    <GridLayout v-for="(doc, index) in interviews" rows="194" columns="346" class="card"  >
                        <Button row="0" col="0" class="btnDpad" width="346" height="194" :backgroundImage="'http://hbbtv.ert.gr'+doc.menu_img_url" @loaded="elementLoaded($event)" @tap="onItemTap(index, 3)" />                        
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
            onItemTap: function(args,no) {
                var seira = "";
                switch(no) {
                    case 1: 
                        seira = this.documentaries[args];
                        break;
                    case 2:
                        seira = this.entertmns[args];
                        break;
                    case 3:
                        seira = this.interviews[args];
                        break;
                    case 4:
                        seira = this.eldocumentaries[args];
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
                this.documentaries = response.content.toJSON().services.filter(function (chain) {
                        return chain.masterCategory === "&Xi;&#941;&nu;&alpha; &Nu;&tau;&omicron;&kappa;&iota;&mu;&alpha;&nu;&tau;&#941;&rho;";})[0].items;
                this.eldocumentaries = response.content.toJSON().services.filter(function (chain) {
                        return chain.masterCategory === "&Epsilon;&lambda;&lambda;&eta;&nu;&iota;&kappa;&#940; &Nu;&tau;&omicron;&kappa;&iota;&mu;&alpha;&nu;&tau;&#941;&rho;";})[0].items;
                this.entertmns = response.content.toJSON().services.filter(function (chain) {
                        return chain.masterCategory === "&Psi;&upsilon;&chi;&alpha;&gamma;&omega;&gamma;&#943;&alpha;";})[0].items;
                this.interviews = response.content.toJSON().services.filter(function (chain) {
                        return chain.masterCategory === "&Sigma;&upsilon;&nu;&epsilon;&nu;&tau;&epsilon;&#973;&xi;&epsilon;&iota;&sigmaf;";})[0].items;                
                this.idx = Math.floor(Math.random() * this.documentaries.length);
                this.ok = true;
                }, error => {
                console.error(error);
                });
              
        },        
        data() {
            return {
                documentaries: [ ],
                eldocumentaries: [ ],                
                entertmns: [ ],
                interviews: [ ],
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
