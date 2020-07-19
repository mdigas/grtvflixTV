<template>
    <Page class="page" actionBarHidden="true" >
        <ScrollView  orientation="vertical">
            <StackLayout v-if="ok" orientation="vertical">
                <GridLayout columns="50,350,*" rows="auto" >
                    <Image row="0" col="0" colSpan="3" :src="movies[idx].bg_img_url" loadMode="async" horizontalAlignment="right" stretch="fill"  /> 
                    <StackLayout row="0" col="0" colSpan="2" class="stdown">
                        <Label class="h4" :text="movies[idx].title" style="color: white;" />
                        <Label class="diar" :text="'Διάρκεια: '+movies[idx].dur" style="color: white;" />
                        <Label class="desc" :text="movies[idx].short_desc" row="0" col="0" colSpan="2" textWrap="True" />
                        <Label class="dm" :text="'Διαθέσιμο μέχρι: '+movies[idx].expiration_date"  />
                    </StackLayout>
                    <ScrollView orientation="horizontal" row="0" col="0" colSpan="3" class="stdown1" >
                        <StackLayout orientation="horizontal" >
                            <GridLayout v-for="(movie, index) in movies" rows="200,1" columns="350" class="card"  >
                                <Image row="0" col="0" :src="movie.image"  class="card" loadMode="async" stretch="aspectFill" @tap="onItemTap(index)" />
                                <Button row="1" col="0" :id="index" class="btnDpad" @loaded="elementLoaded($event)" @tap="onItemTap(index)" />
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
                this.$goto('Movie', {
                    animated: true,
                    transition: {
                        name: "slideLeft",
                        duration: 250,
                        curve: "easeIn"},
                    transitioniOS: {},
                    transitionAndroid: {},
                    props: {
                        movie: this.movies[args]
                    }
                });
            },
        },
        created: function() {
            var url="http://hbbtv.ert.gr/pub/smarttv/ert/getFeedContent.php?categoryIdnam=tainies";

            http.request({
                url: url,
                method: "GET",
                }).then(response => {
                this.movies = response.content.toJSON().elems[0].items;
                this.idx = Math.floor(Math.random() * this.movies.length);
                this.ok = true;
                }, error => {
                console.error(error);
                });              
        },        
        data() {
            return {
                movies: [ ],
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
