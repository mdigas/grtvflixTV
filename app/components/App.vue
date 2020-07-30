<template>
    <GridLayout class="nav" columns="auto, *" >
       <!-- <Nav col="0" :visibility="ok ? 'visible' : 'collapsed'" /> -->
        <GridLayout col="0" rows="50" columns="50" class="page1" >
            <Button row="0" col="0" id="menu" :text="ok ? '<' : '>'" class="nav-btn" @loaded="elementLoaded($event)" @tap="onDrawerButtonTap"></Button>
        </GridLayout>
        <StackLayout row="0" col="0" :visibility="ok ? 'visible' : 'collapsed'" class="page1"  >
            <Image src="res://icon" width="72" height="72"></Image>
            <Label class="h5label" text="ERTflixTV"></Label>
            <Label class="h6label" text="ertflix@protonmail.com"></Label>
            <ScrollView  orientation="vertical">
                <GridLayout rows="auto, auto, auto, auto, auto, auto, auto, auto, auto, auto" columns="150" >
                    <Button class="nav-btn" text='Αρχική' @loaded="elementLoaded($event)" @tap="goTo('Home')" row="0" col="0" />
                    <Button class="nav-btn" text='Ταινίες' @loaded="elementLoaded($event)" @tap="goTo('Movies')" row="1" col="0" />
                    <Button class="nav-btn" text='Σειρές' @loaded="elementLoaded($event)" @tap="goTo('Serials')" row="2" col="0" />
                    <Button class="nav-btn" text='Ενημέρωση' @loaded="elementLoaded($event)" @tap="goTo('Enimerosi')" row="3" col="0" />
                    <Button class="nav-btn" text='Εκπομπές' @loaded="elementLoaded($event)" @tap="goTo('Ekpobes')" row="4" col="0" />
                    <Button class="nav-btn" text='Αθλητικά' @loaded="elementLoaded($event)" @tap="goTo('Sports')" row="5" col="0" /> 
                    <Button class="nav-btn" text='Παιδικά' @loaded="elementLoaded($event)" @tap="goTo('Forchild')" row="6" col="0" /> 
                    <Button class="nav-btn" text='Αρχείο' @loaded="elementLoaded($event)" @tap="goTo('Archives')" row="7" col="0" /> 
                    <Button class="nav-btn" text='LiveTV' @loaded="elementLoaded($event)" @tap="goTo('LiveTV')" row="8" col="0" /> 
                    <Button class="nav-btn" text='Αναζήτηση' @loaded="elementLoaded($event)" @tap="goTo('Search')" row="9" col="0" />                                
                </GridLayout>
            </ScrollView>
        </StackLayout>
        <ContentView row="0" col="1"  >
            <Frame class="nav">
                <Home />
            </Frame>
        </ContentView>
    </GridLayout>
</template>

<script>
    import Home from './Home'
    import Nav from './Nav'  
    import routes from "../routes";      
    export default {
        methods: {
            elementLoaded(args) {
                const view = args.object;
                view.android["jsview"] = args.object;
            },           
            goTo(name) {
                this.ok = 0;
                //,{ clearHistory: true } can be added to get rid of the back button
                this.$navigateTo(routes[name]);
            },        
        onDrawerButtonTap(args) {
            this.ok = this.ok ? 0 : 1;
            },
        },
        components: { Home, Nav },
        data() {
            return {
                ok: 0,
            };
        }
    };
</script>

<style>
</style>