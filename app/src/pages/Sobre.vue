<template>
    <q-page padding>
        <q-card
        class="text-white card-sobre"
        >
        <q-card-section>
            <div class="text-h6">Informações sobre o aplicativo</div>
        </q-card-section>
        <q-separator color="yellow" inset />
        <q-card-section>
            V1.0.0 <br>
            Este aplicativo consome a API da Marvel, que retorna informações sobre seus personagens. <br> 
            A API pode ser acessada em https://developer.marvel.com . <br>
            Os textos são traduzidos usando a Google Cloud Translate API. <br><br>

            Para mais informações acesse meu github: github.com/froeder ou froeder.github.io     <br><br>



            <strong>MIT License </strong> <br>
            Copyright (c) 2019 Jhonatan Froeder

            
        </q-card-section>
        </q-card>
    </q-page>
</template>

<script>
export default {
    data () {
        return {
        
        }
    },
}
</script>

<style>
   .card-sobre{
        background:  radial-gradient(rgba(0, 238, 255, 0.9), rgba(0, 207, 239, 0.7));
        border-style: solid;
        border-width: 2px ;
        border-color: #00EEFF ;
        border-radius: 0px 40px 0px 40px ;
       height: 79vh
   }
</style>
