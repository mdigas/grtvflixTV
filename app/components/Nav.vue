<template>
    <GridLayout rows="auto, auto, auto, auto, auto, auto, auto, auto" columns="200">
        <Button class="nav-btn" text='Αρχική' @loaded="elementLoaded($event)" @tap="goTo('Home')" row="0" col="0" />
        <Button class="nav-btn" text='Ταινίες' @loaded="elementLoaded($event)" @tap="goTo('Movies')" row="1" col="0" />
        <Button class="nav-btn" text='Σειρές' @loaded="elementLoaded($event)" @tap="goTo('Serials')" row="2" col="0" />
        <Button class="nav-btn" text='Ενημέρωση' @loaded="elementLoaded($event)" @tap="goTo('Enimerosi')" row="3" col="0" />
        <Button class="nav-btn" text='Εκπομπές' @loaded="elementLoaded($event)" @tap="goTo('Ekpobes')" row="4" col="0" />
        <Button class="nav-btn" text='Αθλητικά' @loaded="elementLoaded($event)" @tap="goTo('Sports')" row="5" col="0" /> 
        <Button class="nav-btn" text='Παιδικά' @loaded="elementLoaded($event)" @tap="goTo('Forchild')" row="6" col="0" /> 
        <Button class="nav-btn" text='Αρχείο' @loaded="elementLoaded($event)" @tap="goTo('Archives')" row="7" col="0" />                                
    </GridLayout>
</template>

<script>
    import routes from "../routes";
    export default {
        methods: {
            elementLoaded(args) {
                const view = args.object;
                view.android["jsview"] = args.object;
            },
            goTo(name) {
                this.$showDetails.value = 0;
                //,{ clearHistory: true } can be added to get rid of the back button
                this.$navigateTo(routes[name]);
            }
        }
    };
</script>

<style>

</style>