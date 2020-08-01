<template>
    <Page class="page" actionBarHidden="true" >
        <GridLayout columns="50,400,*, *" rows="*, *, auto" >
             <Image row="0" col="0" colSpan="4" rowSpan="3" :src="'http://hbbtv.ert.gr'+this.$props.seira.bg_img_url" loadMode="async" horizontalAlignment="right" verticalAlignment="top" stretch="aspectFit"  /> 
             <StackLayout row="1" col="1" colSpan="2" >
                <HtmlView :class="'h2-w'+$width" :html="mv.title" />
                <HtmlView :class="'h3-w'+$width" :html="mv.short_desc" />
            </StackLayout>        
            <ScrollView row="2" col="0" colSpan="4" orientation="horizontal" >
                <StackLayout orientation="horizontal" >
                    <GridLayout  v-for="(episode, index) in episodes" :rows="episode_rows" :columns="episode_col" class="card" >
                        <Button row="0" col="0" class="btnDpad" :width="photo_width" :height="photo_width" :backgroundImage="episode.image" @loaded="elementLoaded($event)" @tap="onTapPlay(index)" />
                        <StackLayout row="1" col="0" class="subcard" >
                            <HtmlView v-if="episode.title" :html="episode.title" :class="'eptitle-w'+$width" />
                            <Label v-if="episode.expiration_date" :class="'epsmalld-w'+$width" :text="'Διάρκεια: '+episode.dur+'    Διαθ.Μέχρι: '+episode.expiration_date" />
                            <Label v-if="episode.season_num || episode.episode_num" :class="'epsmall-w'+$width" >
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
                episode_rows: '',
                episode_col: '',
                photo_width: '',
                photo_height: '',
            };                
        },
        
    };
</script>
