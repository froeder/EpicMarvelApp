<template>
    <q-page padding>
        <span class="text-weight-thin">Detalhes sobre a revista</span>
        <div class="text-center" v-if="loading == true">
            <q-spinner-tail
                color="yellow"
                size="5em"/>
                Baixando Dados
        </div>
        <q-card v-if="quadrinho.title" style="background-color:#e9e9e9">
            <q-img
                :src="quadrinho.thumbnail.path+'.'+quadrinho.thumbnail.extension"
            >
            </q-img>
            <div style="margin-bottom:1em" class="text-center">
                <span class="text-subtitle2 " style="font-size:1.5em">
                    {{quadrinho.title}}
                </span> <br>
                <span>Ano de Lançamento: {{quadrinho.dates[0].date.split('-')[0]}}</span>
            </div>
            <q-card-section>
                {{quadrinho.description || 'Sem descrição'}} <br> <br>

                Faz parte da série : <strong>{{quadrinho.series.name}} </strong> <br>
                Quantidade de páginas: <strong>{{quadrinho.pageCount}}</strong> <br>
                
                <span>Preço : <strong>US$ {{quadrinho.prices[0].price}}</strong> (Versão impressa) </span>
                <br>
            </q-card-section>
            <q-separator/>
            <q-card-actions>
                Link para acessar a revista através do site da Marvel:
                <a target="no_blank" :href="quadrinho.urls[0].url">Acessar</a>
            </q-card-actions>
        </q-card>

        <span v-if="quadrinho.images.length > 0" class="marvel" style="color:white ;margin-top:1em">IMAGENS</span>
        <q-carousel 
            v-if="quadrinho.images.length > 0"
            style="margin-top:1em"
            animated
            swipeable
            v-model="slide"
            arrows
            thumbnails
            infinite
            :fullscreen.sync="fullscreen"
        >
            <q-carousel-slide :name="image.path" v-for="image in quadrinho.images" :img-src="image.path+'.'+image.extension" />
            <template v-slot:control>
                <q-carousel-control
                position="bottom-right"
                :offset="[18, 18]"
                >
                <q-btn
                    push round dense color="white" text-color="primary"
                    :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
                    @click="fullscreen = !fullscreen"
                />
                </q-carousel-control>
            </template>
        </q-carousel>
    </q-page>
</template>

<script>
import MarvelApi from '../services/MarvelAPI'
import {Notify} from 'quasar'
import { QSpinnerFacebook } from 'quasar'
import {LocalStorage} from 'quasar'
import SocialSharing from 'vue-social-sharing'

export default {
    data(){
        return {
            id: this.$route.params.id ,
            quadrinho: {},
            loading: true,
            slide: 1,
            fullscreen: false
        }
    },
    components:{
        SocialSharing
    },
    mounted(){

        this.baixarRevista(this.id)
    },
    methods:{
        traduz(resultado){
            let self = this
            console.log(resultado)
            var googleTranslate = require('google-translate')('AIzaSyC_Vt7D6DAWGohSGOFmD6urdGCvcoodmts');
            self.quadrinho = resultado
            if(resultado.description != null){
                googleTranslate.translate(resultado.description, 'pt', function(err, translation) {
                let desc = translation.translatedText
                self.quadrinho.description = desc
                // localStorage.setItem(self.id, JSON.stringify(self.quadrinho))
            });
            } 
                        
            
        },
        baixarRevista(id){
            let self = this
            MarvelApi.getComic(id, comics => {
                let comic = comics.data.data.results
                this.traduz(comics.data.data.results[0])
                self.loading = false
            }) 
        }
    }
}
</script>

<style>

</style>
