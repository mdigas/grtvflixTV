<template>
    <Page class="page" actionBarHidden="true" >
            <Label class="action-bar-title" text="Αναζήτηση"></Label>
        </ActionBar>

        <ScrollView>
            <StackLayout>
                    <Label col="0" ><FormattedString><Span text.decode="&#xf002;" class="nt-icon fas"></Span>
                    <Span text="  Αναζήτηση" class="h2"></Span></FormattedString></Label> 
                <SearchBar v-model="searchQuery" hint="Αναζήτηση" textFieldHintColor="#FFFFFF" class="search" @submit="onSearchSubmit" />
                    <WrapLayout>
                        <GridLayout  v-for="(ekp, index) in ekpompes" rows="200,1,auto" columns="350" class="card" >
                            <Image row="0" col="0" :src="ekp.bild" class="card"  loadMode="async" stretch="aspectFill"  @tap="onTapPlay(index)" />
                            <Button row="1" col="0" :id="index" class="btnDpad" @loaded="elementLoaded($event)"  @tap="onTapPlay(index)" />  
                            <HtmlView row="2" col="0" class="lbl" :html="ekp.title" style="color: white;" />
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
                ekpompes: []
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
