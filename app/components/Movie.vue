<template>
    <Page class="page"  actionBarHidden="true" >  
        <ScrollView :style="bcpage"> 
        <StackLayout orientation="vertical">
        <GridLayout columns="50,350,auto" rows="auto" >
             <StackLayout row="0" col="0" colSpan="2" class="stdown">
                <Label class="h4" :text="mv.title" style="color: white;" />
                <Label class="diar" :text="'Διάρκεια: '+mv.dur" style="color: white;" />
                <HtmlView class="h4" :html="mv.short_desc" style="color: white;" />
                <Label  v-if="mv.expiration_date" class="dm" :text="'Διαθέσιμο μέχρι: '+mv.expiration_date"  />
                <GridLayout columns="auto,20,auto" rows="auto" style="margin-top: 100px;" >
                    <Button row="0" col="0" class="nav-btn" text="" @loaded="elementLoaded($event)" @tap="onTapPlay" >    
                        <FormattedString><Span text="Προβολή" ></Span></FormattedString>
                    </Button>
                    <Button row="0" col="2" class="nav-btn" @loaded="elementLoaded($event)" @tap="onmoreTap">
                            <FormattedString><Span text="Περισσότερα" ></Span></FormattedString>
                    </Button>
                </GridLayout>
            </StackLayout>
        </GridLayout>
        </StackLayout>      
        </ScrollView>
    </Page>
</template>

<script>
    var utilsModule = require("tns-core-modules/utils/utils");
    import * as application from 'application';
    export default {
        methods: {
            elementLoaded(args) {
                const view = args.object;
                view.android["jsview"] = args.object;
            },
            onTapPlay: function(args) {
            const i = new android.content.Intent(android.content.Intent.ACTION_VIEW);
            i.setDataAndType(android.net.Uri.parse(this.mv.mp4), "video/mp4");
            application.android.foregroundActivity.startActivity(i);
            },
            onmoreTap: function(args) {
                console.log("Item with index: " + args + " tapped");
                this.$goto('MovieDetail', {
                    animated: true,
                    transition: {
                        name: "slideLeft",
                        duration: 250,
                        curve: "easeIn"},
                    transitioniOS: {},
                    transitionAndroid: {},
                    props: {
                        detail: this.mv.desc
                    }
                });
            },      
        },

        props: ["movie"], 
        
        data() {
            return {
                mv: this.$props.movie, 
                bcpage: {
                    'backgroud-color': 'black',
                    'background-image': 'url("'+this.$props.movie.bg_img_url+'")',
                    'background-repeat': 'no-repeat',
                    'background-position': 'right top',
                    'background-size': 'auto',
                    },
            };
        },
        
    };
</script>