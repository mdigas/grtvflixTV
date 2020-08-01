<template>
    <Page class="page" actionBarHidden="true" >
            <Label class="action-bar-title" text="Αναζήτηση"></Label>
        </ActionBar>

        <ScrollView>
            <StackLayout>
                    <Label col="0" ><FormattedString><Span text.decode="&#xf002;" class="nt-icon fas"></Span>
                    <Span text="  Αναζήτηση" class="h2"></Span></FormattedString></Label> 
                <SearchBar v-model="searchQuery" textFieldHintColor="#FFFFFF" class="search" @submit="onSearchSubmit" />
                    <WrapLayout>
                        <GridLayout  v-for="(ekp, index) in ekpompes" :rows="episode_rows" :columns="episode_col" class="card" >
                            <Button row="0" col="0" class="btnDpad" :width="photo_width" :height="photo_width" :backgroundImage="ekp.bild" @loaded="elementLoaded($event)"  @tap="onTapPlay(index)" />  
                            <HtmlView row="1" col="0" :class="'eptitle-w'+$width" :html="ekp.title" />
                        </GridLayout>
                    </WrapLayout>   
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import * as http from "http";
    var utilsModule = require("tns-core-modules/utils/utils");
    import * as application from 'application';

    export default {
        methods: {
            elementLoaded(args) {
                const view = args.object;
                view.android["jsview"] = args.object;
            },            
            onSearchSubmit(args) {
                switch(this.$width) {
                    case 1280: 
                        this.episode_rows ='147, auto';
                        this.episode_col ='273';
                        this.photo_width='273';
                        this.photo_height='147';
                        break;
                    case 1920:
                        this.episode_rows ='194, auto';
                        this.episode_col ='346';
                        this.photo_width='346';
                        this.photo_height='194';                    
                        break;
                    case 3840:
                        this.episode_rows ='221, auto';
                        this.episode_col ='410';
                        this.photo_width='410';
                        this.photo_height='221';                    
                        break;
                        };
                var url="http://hbbtv.ert.gr/pub/smarttv/ert/dyn/feed_search.php?type=full&keyword="+this.searchQuery;
              
                http.request({
                    url: url,
                    method: "GET",
                    }).then(response => {
                    this.ekpompes = response.content.toJSON();
                    utilsModule.ad.dismissSoftInput();
                    }, error => {
                    console.error(error);
                });

            },
            onTapPlay: function(args) {
            if (this.ekpompes[args].url != "") {
                const i = new android.content.Intent(android.content.Intent.ACTION_VIEW);
                i.setDataAndType(android.net.Uri.parse(this.ekpompes[args].url), "video/mp4");
                application.android.foregroundActivity.startActivity(i);
            };
            },
        },

        data() {
            return {
                searchQuery: null,
                ekpompes: [],
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
    .search{
        background-color: #181616;
        color: #ffffff;
        font-size: 24;
    }
    .nt-icon{
        color: #ffffff;
        font-size: 24;
    }
</style>
