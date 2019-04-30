<template>
    <q-page padding>
        <span>Personagem Detalhado</span>
        <div v-for="personagem in personagem">
            <q-card
                class="text-white"
                style="background-color:#8E7D6B ; margin-bottom:1em"
            > 
            <q-img
                :src="personagem.thumbnail.path+'.'+personagem.thumbnail.extension"
            >
                <div class="absolute-bottom text-subtitle2 text-center">
                {{personagem.name}}
                </div>
            </q-img>

            <q-card-section>
                {{personagem.descricao}}
            </q-card-section>
            <q-separator/>
            </q-card>
    
            
            <q-card>
                <div class="text-center" v-if="loading == true">
                     
                    <q-spinner-tail
                        color="yellow"
                        size="5em"/>
                        Baixando Revistas
                </div>
                
                <q-card-section v-if="loading == false">
                    <span class="marvel">QUADRINHOS</span> <br>
                    <span>Todas as aparições do personagem</span>
                    <q-timeline color="secondary">
                        <q-timeline-entry
                            v-for="comic in quadrinhos"
                            :title="comic.title"
                            :subtitle="converte(comic.dates[0].date)"
                        >
                        </q-timeline-entry>
                    </q-timeline>
                </q-card-section>
            </q-card>                           
            <q-btn style="margin-top:1em" color="info" @click="$router.go(-1)">Voltar</q-btn>
        </div>
        <span>Data provided by Marvel. © 2019 MARVEL</span>
    </q-page>
</template>

<script>
import MarvelApi from '../services/MarvelAPI'
import {Notify} from 'quasar'
import { QSpinnerFacebook } from 'quasar'
import {LocalStorage} from 'quasar'

export default {
    data(){
        return{
            personagem: {},
            id: this.$route.params.id,
            quadrinhos: {},
            quadrinho: [],
            loading: true
        }
    },
    mounted(){
        this.buscarPersonagens(this.id)
        this.loading = true
    },
    methods:{
        showLoading () {
            const spinner = typeof QSpinnerFacebook !== 'undefined'
                ? QSpinnerFacebook // Non-UMD, imported above
                : Quasar.components.QSpinnerFacebook // eslint-disable-line
            /* End of Codepen workaround */

            this.$q.loading.show({
                spinner,
                spinnerColor: 'yellow',
                spinnerSize: 140,
                backgroundColor: 'red',
                message: 'Pesquisando',
                messageColor: 'black'
            })
        },
        converte(data){
            let datas = data.split('-')
            let self = this

            return datas[2].split('T')[0] +'/' + datas[1] +'/' +datas[0]           
        },
        buscaQuadrinhos(id){
            let self = this
            MarvelApi.getCharacterComics(id, comics => {
                let comic = comics.data.data.results
                    
                self.quadrinhos = comic
                self.loading = false
            }) 
        },
        traduz(resultado){
            let desc = ''
            let self = this
            for(let i = 0 ; i < resultado.length ; i++) {

            var googleTranslate = require('google-translate')('AIzaSyC_Vt7D6DAWGohSGOFmD6urdGCvcoodmts');
                googleTranslate.translate(resultado[i].description, 'pt', function(err, translation) {
                    let desc = translation.translatedText
                    self.personagem = resultado
                    self.personagem[i].descricao = translation.translatedText
                    self.buscaQuadrinhos(self.personagem[i].id)
                    // self.personagem = resultado[i]

                });            
            }  
            // console.log(self.personagem)
        },
        buscarPersonagens(id){
            var self = this
            self.personagem = {}
            this.showLoading()
            MarvelApi.getCharacter(id, characters => {
            let resultado = characters.data.data.results
            self.atribuicao = characters.data.attributionText

            this.traduz(resultado)
            
                // this.traduz(resultado)
                this.$q.loading.hide()
            
            
            })
        
        
        },
    },
    beforeDestroy () {
        this.$q.loading.hide()
    }
}
</script>

<style scoped>
    .marvel{
        font-family: "Marvel";
    }
    .quadrinho{
        background-image: 
    }

</style>
