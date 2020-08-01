<template>
    <Page class="page"  actionBarHidden="true" >
        <ScrollView  orientation="vertical">
        <StackLayout v-if="ok" orientation="vertical">
        <GridLayout columns="50,400,*,*" rows="*,*,auto" >
             <Image row="0" col="0" colSpan="4" rowSpan="3" :src="'http://hbbtv.ert.gr'+documentaries[idx].bg_img_url" loadMode="async" horizontalAlignment="right" verticalAlignment="top" stretch="aspectFit" /> 
             <StackLayout row="1" col="1" colSpan="2" >
                <HtmlView :class="'h2-w'+$width" :html="documentaries[idx].title" />
                <HtmlView :class="'h3-w'+$width" :html="documentaries[idx].short_desc" textWrap="True" />
            </StackLayout>
            <StackLayout row="2" col="0" colSpan="4" >
            <Label text="Ξένα Ντοκιμαντέρ" class="h2" />
            <ScrollView orientation="horizontal">
                <StackLayout orientation="horizontal" >
                    <GridLayout v-for="(doc, index) in documentaries" :rows="episode_rows" :columns="episode_col" class="card" >
                        <Button row="0" col="0" class="btnDpad" :width="photo_width" :height="photo_width" :backgroundImage="'http://hbbtv.ert.gr'+doc.menu_img_url" @loaded="elementLoaded($event)" @tap="onItemTap(index, 1)" />
                    </GridLayout>
                </StackLayout>
            </ScrollView>
            <Label text="Ελληνικά Ντοκιμαντέρ" class="h2" />
            <ScrollView orientation="horizontal">
                <StackLayout orientation="horizontal" >
                    <GridLayout v-for="(eldoc, index) in eldocumentaries" :rows="episode_rows" :columns="episode_col" class="card"  >
                        <Button row="0" col="0" class="btnDpad" :width="photo_width" :height="photo_width" :backgroundImage="'http://hbbtv.ert.gr'+eldoc.menu_img_url" @loaded="elementLoaded($event)" @tap="onItemTap(index, 4)" />                        
                    </GridLayout>
                </StackLayout>
            </ScrollView>            
            <Label text="Ψυχαγωγία" class="h2" />
            <ScrollView orientation="horizontal">
                <StackLayout orientation="horizontal" >
                    <GridLayout v-for="(doc, index) in entertmns" :rows="episode_rows" :columns="episode_col" class="card" >
                        <Button row="0" col="0" class="btnDpad" :width="photo_width" :height="photo_width" :backgroundImage="'http://hbbtv.ert.gr'+doc.menu_img_url" @loaded="elementLoaded($event)"  @tap="onItemTap(index, 2)" />                        
                    </GridLayout>
                </StackLayout>
            </ScrollView>
            <Label text="Συνεντεύξεις" class="h2" />
            <ScrollView orientation="horizontal">
                <StackLayout orientation="horizontal" >
                    <GridLayout v-for="(doc, index) in interviews" :rows="episode_rows" :columns="episode_col" class="card"  >
                        <Button row="0" col="0" class="btnDpad" :width="photo_width" :height="photo_width" :backgroundImage="'http://hbbtv.ert.gr'+doc.menu_img_url" @loaded="elementLoaded($event)" @tap="onItemTap(index, 3)" />                        
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
