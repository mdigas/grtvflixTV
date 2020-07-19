<template>
    <Page class="page" actionBarHidden="true" >
        <ScrollView>
        <WrapLayout>
            <GridLayout rows="150,1" columns="150" class="card" >
                <Image row="0" col="0" class="livetv" src="~/img/ert1.png" @tap="onItemTap(0)" />
                <Button row="1" col="0" class="btnDpad" @loaded="elementLoaded($event)"  @tap="onItemTap(0)" />
            </GridLayout> 
            <GridLayout rows="150,1" columns="150" class="card" >
                <Image class="livetv" src="~/img/ert2.png" @tap="onItemTap(1)" />
                <Button row="1" col="0" class="btnDpad" @loaded="elementLoaded($event)"  @tap="onItemTap(1)" />
            </GridLayout> 
            <GridLayout rows="150,1" columns="150" class="card" >
                <Image class="livetv" src="~/img/ert3.png" @tap="onItemTap(2)"/>
                <Button row="1" col="0" class="btnDpad" @loaded="elementLoaded($event)"  @tap="onItemTap(2)" />
            </GridLayout> 
            <GridLayout rows="150,1" columns="150" class="card" >
                <Image class="livetv" src="~/img/ertsport.png" @tap="onItemTap(3)"/>
                <Button row="1" col="0" class="btnDpad" @loaded="elementLoaded($event)"  @tap="onItemTap(3)" />
            </GridLayout> 
            <GridLayout rows="150,1" columns="150" class="card" >
                <Image class="livetv" src="~/img/ertworld.png" @tap="onItemTap(4)" />
                <Button row="1" col="0" class="btnDpad" @loaded="elementLoaded($event)"  @tap="onItemTap(4)" />
            </GridLayout> 
            <GridLayout rows="150,1" columns="150" class="card" >
                <Image class="livetv" src="~/img/ertplay1.png" @tap="onItemTap(5)" />
                <Button row="1" col="0" class="btnDpad" @loaded="elementLoaded($event)"  @tap="onItemTap(5)" />
            </GridLayout> 
            <GridLayout rows="150,1" columns="150" class="card" >
                <Image class="livetv" src="~/img/ertplay2.png" @tap="onItemTap(6)" />
                <Button row="1" col="0" class="btnDpad" @loaded="elementLoaded($event)"  @tap="onItemTap(6)" />
            </GridLayout> 
            <GridLayout rows="150,1" columns="150" class="card" >
                <Image class="livetv" src="~/img/ertplay3.png" @tap="onItemTap(7)" />
                <Button row="1" col="0" class="btnDpad" @loaded="elementLoaded($event)"  @tap="onItemTap(7)" />
            </GridLayout> 
            <GridLayout rows="150,1" columns="150" class="card" >
                <Image class="livetv" src="~/img/ertplay4.png" @tap="onItemTap(8)" />
                <Button row="1" col="0" class="btnDpad" @loaded="elementLoaded($event)"  @tap="onItemTap(8)" />
            </GridLayout> 
            <GridLayout rows="150,1" columns="150" class="card" >
                <Image class="livetv" src="~/img/ertplay5.png" @tap="onItemTap(9)" />
                <Button row="1" col="0" class="btnDpad" @loaded="elementLoaded($event)"  @tap="onItemTap(9)" />
            </GridLayout> 
         </WrapLayout>
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
            onItemTap: function(args) {
                if (args == 2){
                    const i = new android.content.Intent(android.content.Intent.ACTION_VIEW, android.net.Uri.parse("vnd.youtube://" + this.videourl[args]));
                    application.android.foregroundActivity.startActivity(i);
                }else{
                    const i = new android.content.Intent(android.content.Intent.ACTION_VIEW);
                    //i.setDataAndType(android.net.Uri.parse(videourl[args]), "video/mp4");
                    i.setDataAndType(android.net.Uri.parse(this.videourl[args]), "video/mp4");
                    application.android.foregroundActivity.startActivity(i);
                }
            },     
        },
        
        data() {
            return {
                videourl:[
                    "https://ert-live.siliconweb.com/media/ert_1/ert_1.m3u8",
                    "https://ert-live.siliconweb.com/media/ert_2/ert_2.m3u8",
                    "F_jfMlJiDcc",
                    "https://ert-live.siliconweb.com/media/ert_sports/ert_sportshigh.m3u8",
                    "https://ert-live.siliconweb.com/media/ert_world/ert_world.m3u8",
                    "https://ert-live.siliconweb.com/media/ert_play_1/ert_play_1.m3u8",
                    "https://ert-live.siliconweb.com/media/ert_play_2/ert_play_2.m3u8",
                    "https://ert-live.siliconweb.com/media/ert_play_3/ert_play_3.m3u8",
                    "https://ert-live.siliconweb.com/media/ert_play_4/ert_play_4.m3u8",
                    "https://ert-live.siliconweb.com/media/ert_play_5/ert_play_5.m3u8",

                ]
          
            };
        },
        
    };
</script>