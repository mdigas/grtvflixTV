<template>
    <Page class="page" actionBarHidden="true" >
        <GridLayout columns="50,400,*" rows="265, *" >
             <Image row="0" col="0" colSpan="3" rowSpan="2" :src="'http://hbbtv.ert.gr'+this.$props.seira.bg_img_url" loadMode="async" horizontalAlignment="right" verticalAlignment="top" stretch="aspectFit"  /> 
             <StackLayout row="0" col="0" colSpan="2" class="stdown" >
                <HtmlView class="h5" :html="mv.title" style="color: white;" />
                <HtmlView class="h6" :html="mv.short_desc" style="color: white;" />
            </StackLayout>        
            <ScrollView row="1" col="0" colSpan="3" orientation="horizontal" >
                <StackLayout orientation="horizontal" >
                    <GridLayout  v-for="(episode, index) in episodes" rows="147, auto" columns="273" class="card" >
                        <Button row="0" col="0" class="btnDpad" width="273" height="147" :backgroundImage="episode.image" @loaded="elementLoaded($event)" @tap="onTapPlay(index)" />
                        <StackLayout row="1" col="0" class="subcard" >
                            <HtmlView v-if="episode.title" :html="episode.title" class="eptitle" />
                            <Label v-if="episode.expiration_date" class="epsmalld" :text="'Διάρκεια: '+episode.dur+'    Διαθ.Μέχρι: '+episode.expiration_date" />
                            <Label v-if="episode.season_num || episode.episode_num" class="epsmall" >
                                <FormattedString>
                                    <Span v-if="episode.season_num" :text="'Σ:'+episode.season_num+' - '" />
                                    <Span v-if="episode.episode_num" :text="'E:'+episode.episode_num" />
                                </FormattedString>
                            </Label>
                        </StackLayout>
                    </GridLayout>
                </StackLayout>
            </ScrollView>     
        </GridLayout>
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
            onTapPlay: function(args) {
            if (this.episodes[args].mp4 != "") {
                const i = new android.content.Intent(android.content.Intent.ACTION_VIEW);
                i.setDataAndType(android.net.Uri.parse(this.episodes[args].mp4), "video/mp4");
                application.android.foregroundActivity.startActivity(i);
            };
            },
        },

        props: ["seira"],

        created: function() {
            
            console.log(this.$props.seira.idnam);
            var url="http://hbbtv.ert.gr/pub/smarttv/ert/getFeedContent.php?categoryIdnam="+this.$props.seira.idnam;

            http.request({
                url: url,
                method: "GET",
                }).then(response => {
                this.episodes = response.content.toJSON().elems[0].items;
                }, error => {
                console.error(error);
                });
        },

        data() {
            return {
                mv: this.$props.seira,
                episodes: [],
                bcpage: {
                    'backgroud-color': 'black',
                    'background-image': 'url("http://hbbtv.ert.gr'+this.$props.seira.bg_img_url+'")',
                    'background-repeat': 'no-repeat',
                    'background-position': 'right top',
                    'background-size': 'auto',
                    },
            };                
        },
        
    };
</script>
