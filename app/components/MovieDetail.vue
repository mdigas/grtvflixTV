<template>
    <Page class="page" actionBarHidden="true" >
        <ScrollView>
            <StackLayout orientation="vertical">
               <HtmlView class="h6" :html="starthtml+$props.detail+endhtml" />	
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
