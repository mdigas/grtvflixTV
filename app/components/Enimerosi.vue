<template>
    <Page class="page" actionBarHidden="true" >
        <ScrollView  orientation="vertical">
        <StackLayout v-if="ok" orientation="vertical">
        <GridLayout columns="50,350,*" rows="auto" >
             <Image row="0" col="0" colSpan="3" :src="enimerosi[idx].bg_img_url" loadMode="async" horizontalAlignment="right" stretch="fill"  /> 
             <StackLayout row="0" col="0" colSpan="2" class="stdown">
                <Label class="h4" :text="enimerosi[idx].title" style="color: white;" />
                <Label class="diar" :text="'Διάρκεια: '+enimerosi[idx].dur" style="color: white;" />
                <Label class="desc" :text="enimerosi[idx].short_desc" row="0" col="0" colSpan="2" textWrap="True" />
            </StackLayout>
            <ScrollView orientation="horizontal" row="0" col="0" colSpan="3" class="stdown1" >
                <StackLayout orientation="horizontal" >
                    <GridLayout v-for="(enim, indexe) in enimerosi" rows="200,1" columns="350" class="card" >
                        <Image row="0" col="0" :src="enim.image" class="card" loadMode="async" stretch="aspectFill"  @tap="onItemTap(indexe)"  />
                         <Button row="1" col="0" :id="index" class="btnDpad" @loaded="elementLoaded($event)" @tap="onItemTap(indexe)" />                        
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
            onItemTap: function(args) {
                console.log("Item with index: " + args + " tapped");
                this.$goto('News', {
                    animated: true,
                    transition: {
                        name: "slideLeft",
                        duration: 250,
                        curve: "easeIn"},
                    transitioniOS: {},
                    transitionAndroid: {},
                    props: {
                        movie: this.enimerosi[args]
                    }
                });
            },                                  
        },
        created: function() {
            var url1="http://hbbtv.ert.gr/pub/smarttv/ert/getFeedContent.php?categoryIdnam=enimerosi";

            http.request({
                url: url1,
                method: "GET",
                }).then(response => {
                this.enimerosi = response.content.toJSON().elems[0].items;
                this.idx = Math.floor(Math.random() * this.enimerosi.length);
                this.ok = true;
                }, error => {
                console.error(error);
                });      
        },        
        data() {
            return {
                enimerosi: [ ],
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
