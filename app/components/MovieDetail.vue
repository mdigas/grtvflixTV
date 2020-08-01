<template>
    <Page class="page" actionBarHidden="true" >
        <ScrollView>
            <StackLayout orientation="vertical" class="info" >
               <Label :class="'h2-w'+$width" text="Περισσότερες Πληροφορίες" />
               <HtmlView :class="'h3-w'+$width" :html="starthtml+$props.detail+endhtml" />	
            </StackLayout>  
        </ScrollView>
    </Page>         
</template>

<script>
   export default {
        props: ["detail"],
        data() {
            return {
                starthtml: '<div>',
                endhtml: '</div>',
            };
        },

    };
</script>
