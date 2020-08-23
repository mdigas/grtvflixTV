<template>
    <Page class="page" actionBarHidden="true" >
        <ScrollView  orientation="vertical" >
        <StackLayout v-if="ok" orientation="vertical" >
        <GridLayout columns="50,400,*,*" rows="*,*,auto" >
             <Image row="0" col="0" colSpan="4" rowSpan="3" :src="movies[idx].bg_img_url" loadMode="async" horizontalAlignment="right" verticalAlignment="top" stretch="aspectFit"  /> 
             <StackLayout row="1" col="1" colSpan="2" >
                <Label :class="'h2-w'+$width" :text="movies[idx].title" />
                <Label :class="'h3-w'+$width" :text="'Διάρκεια: '+movies[idx].dur" />
                <Label :class="'h3-w'+$width" :text="movies[idx].short_desc" textWrap="True"  />
                <Label :class="'h2-w'+$width" :text="'Διαθέσιμο μέχρι: '+movies[idx].expiration_date"  />
            </StackLayout>
            <StackLayout row="2" col="0" colSpan="4" >
                <Label text="Ταινίες" class="h2"  />
                <ScrollView orientation="horizontal" >
                    <StackLayout orientation="horizontal" >
                        <GridLayout v-for="(movie, index) in movies" :rows="episode_rows" :columns="episode_col" class="card" >
                            <Button row="0" col="0" :id="'m'+index" class="btnDpad" :width="photo_width" :height="photo_width" :backgroundImage="movie.image" @loaded="elementLoaded($event)" @tap="onItemTap(0,index,1)" /> 
                        </GridLayout>
                    </StackLayout>
                </ScrollView>
                <StackLayout v-for="(list, listindex) in seires">
                    <HtmlView class="h2" :html="list.masterCategory" />
                    <ScrollView orientation="horizontal">
                        <StackLayout orientation="horizontal" >
                            <GridLayout v-for="(item, index) in list.items" :rows="episode_rows" :columns="episode_col" class="card" >
                                <Button row="0" col="0" :id="'s'+index" class="btnDpad" :width="photo_width" :height="photo_width" :backgroundImage="'http://hbbtv.ert.gr'+item.menu_img_url" @loaded="elementLoaded($event)" @tap="onItemTap(listindex,index,2)" />
                            </GridLayout>                            
                        </StackLayout>
                    </ScrollView>              
                </StackLayout>
                <StackLayout v-for="(list, listindex) in documentaries">
                    <HtmlView class="h2" :html="list.masterCategory" />
                    <ScrollView orientation="horizontal">
                        <StackLayout orientation="horizontal" >
                            <GridLayout v-for="(item, index) in list.items" :rows="episode_rows" :columns="episode_col" class="card" >
                                <Button row="0" col="0" :id="'s'+index" class="btnDpad" :width="photo_width" :height="photo_width" :backgroundImage="'http://hbbtv.ert.gr'+item.menu_img_url" @loaded="elementLoaded($event)" @tap="onItemTap(listindex,index,3)" />
                            </GridLayout>                            
                        </StackLayout>
                    </ScrollView>              
                </StackLayout>           
                <Label text="Ενημέρωση" class="h2" />
                <ScrollView orientation="horizontal">
                    <StackLayout orientation="horizontal" >
                        <GridLayout v-for="(enim, index) in enimerosi" :rows="episode_rows" :columns="episode_col" class="card" >
                            <Button row="0" col="0"  class="btnDpad" :width="photo_width" :height="photo_width" :backgroundImage="enim.image" @loaded="elementLoaded($event)" @tap="onItemTap(0,index,4)" />                            
                        </GridLayout>
                    </StackLayout>
                </ScrollView> 
                <StackLayout v-for="(list, listindex) in paidika">
                    <HtmlView class="h2" :html="list.masterCategory" />
                    <ScrollView orientation="horizontal">
                        <StackLayout orientation="horizontal" >
                            <GridLayout v-for="(item, index) in list.items" :rows="episode_rows" :columns="episode_col" class="card" >
                                <Button row="0" col="0" :id="'s'+index" class="btnDpad" :width="photo_width" :height="photo_width" :backgroundImage="'http://hbbtv.ert.gr'+item.menu_img_url" @loaded="elementLoaded($event)" @tap="onItemTap(listindex,index,5)" />
                            </GridLayout>                            
                        </StackLayout>
                    </ScrollView>              
                </StackLayout>
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
            onItemTap: function(l, args,no) {
                var seira = "";
                var NavNext = "Seires";
                switch(no) {
                    case 1: 
                        seira = this.movies[args];
                        NavNext = "Movie";
                        break;
                    case 2:
                        seira = this.seires[l].items[args];
                        break;
                    case 3:
                        seira = this.documentaries[l].items[args];
                        break;
                    case 4:
                        seira = this.enimerosi[args];
                        NavNext = "Movie";
                        break;
                    case 5:
                        seira = this.paidika[l].items[args];
                        break;                         
                    };
                this.$goto(NavNext, {
                    animated: true,
                    transition: {
                        name: "slideLeft",
                        duration: 250,
                        curve: "easeIn"},
                    transitioniOS: {},
                    transitionAndroid: {},
                    props: {
                        msitem: seira
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

            var url1="http://hbbtv.ert.gr/pub/smarttv/ert/getFeedContent.php?categoryIdnam=enimerosi";

            http.request({
                url: url1,
                method: "GET",
                }).then(response => {
                this.enimerosi = response.content.toJSON().elems[0].items;
                }, error => {
                console.error(error);
                });      

            var url2="http://hbbtv.ert.gr/pub/smarttv/ert/feed_NewLayout.php";

            http.request({
                url: url2,
                method: "GET",
                }).then(response => {
                    this.seires = response.content.toJSON().services.filter(function (chain) {
                            return chain.id === "32";});
                    this.documentaries = response.content.toJSON().services.filter(function (chain) {
                            return chain.id === "26";});
                    this.paidika = response.content.toJSON().services.filter(function (chain) {
                            return chain.id === "29";}); }, 
                    error => {
                console.error(error);
                });
              
        },        
        data() {
            return {
                movies: [ ],
                seires: [ ],
                documentaries: [ ],               
                enimerosi: [ ],
                paidika: [ ],
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
