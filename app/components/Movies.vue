<template>
    <Page class="page" actionBarHidden="true" >
        <ScrollView  orientation="vertical" >
            <StackLayout v-if="ok" orientation="vertical" >
                <GridLayout columns="50,400,*,*" rows="*,*,auto" >
                    <Image row="0" col="0" colSpan="4" rowSpan="3" :src="movies[idx].bg_img_url" loadMode="async" horizontalAlignment="right" stretch="fill"  /> 
                    <StackLayout row="1" col="1" colSpan="2" >
                        <Label :class="'h2-w'+$width" :text="movies[idx].title" />
                        <Label :class="'h3-w'+$width" :text="'Διάρκεια: '+movies[idx].dur" />
                        <Label :class="'h3-w'+$width" :text="movies[idx].short_desc" textWrap="True" />
                        <Label :class="'h3-w'+$width" :text="'Διαθέσιμο μέχρι: '+movies[idx].expiration_date"  />
                    </StackLayout>
                    <ScrollView orientation="horizontal" row="2" col="0" colSpan="4" >
                        <StackLayout orientation="horizontal" >
                            <GridLayout v-for="(movie, index) in movies" :rows="episode_rows" :columns="episode_col" class="card" >
                                <Button row="0" col="0" class="btnDpad" :width="photo_width" :height="photo_width" :backgroundImage="movie.image" @loaded="elementLoaded($event)" @tap="onItemTap(index)" />
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
                        msitem: this.movies[args]
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
