<template>
    <q-page padding>
        <span class="text-weight-thin">Personagem Aleatório</span> <br>
        <q-btn color="positive" class="full-width" @click="buscarPersonagens()">Randomize</q-btn>
        <q-card
            class="text-white"
            v-for="personagem in personagem"
            :key="personagem.nome"
            style="background-color:#8E7D6B ; margin-bottom:1em ; margin-top:1em"
        > 
        <q-img
            :src="personagem.imagem"
        >
            <div class="absolute-bottom text-subtitle2 text-center">
            {{personagem.nome}}
            </div>
        </q-img>

        <q-card-section>
            {{personagem.descricao || 'Sem descrição'}}
        </q-card-section>
        <q-separator/>
        <q-card-actions align="around">
            <q-btn flat round color="black" icon="visibility" @click="detalhes(personagem)" />
            <q-btn flat round color="yellow" :icon="personagem.favs" @click="favorita(personagem)" />
            <social-sharing 
                url="https://play.google.com/store/apps/details?id=org.cordova.marvelfroeder.app"
                :title="personagem.nome"
                :description="personagem.descricao"
                :quote="personagem.nome+' '+personagem.descricao"
                hashtags="marvel studio, avengers"
                inline-template>
            <div>
                <network network="facebook">
                    <q-btn flat round color="primary" icon="share" />Facebook
                </network>
                <network network="whatsapp">
                    <q-btn flat round color="primary" icon="share" /> WhatsApp
                </network>
            </div>
            </social-sharing>
        </q-card-actions>
        </q-card>
        <span v-if="personagem.nome != []">{{atribuicao}}</span>
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
        return{
            personagem: [],
             atribuicao: '',
        }
    },
    components:{
        SocialSharing
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
        traduz(resultado){
            let desc = ''
            let self = this
            for(let i = 0 ; i < resultado.length ; i++) {

            var googleTranslate = require('google-translate')('AIzaSyC_Vt7D6DAWGohSGOFmD6urdGCvcoodmts');
                googleTranslate.translate(resultado[i].description, 'pt', function(err, translation) {
                desc = translation.translatedText
                self.personagem.push({
                    nome: resultado[i].name,
                    descricao: desc,
                    imagem: resultado[i].thumbnail.path+'.'+resultado[i].thumbnail.extension,
                    id: resultado[i].id,
                    favs: 'star_border'
                })
                });            
            }  
        },
        buscarPersonagens(nome){
            var self = this
            this.personagem = []
            this.showLoading()
            MarvelApi.getRandomCharacters(characters => {
            let resultado = characters.data.data.results
            self.atribuicao = characters.data.attributionText
            
                this.traduz(resultado)
                this.$q.loading.hide()
            
            
            })
        
        // console.log(self.personagens)
        },
        favorita(personagem){
            let self = this

            localStorage.setItem(personagem.nome+personagem.id, JSON.stringify(personagem))
            
            personagem.favs = 'star'
            Notify.create({
                color: 'positive',
                message: personagem.nome +' foi adicionado aos favoritos',
                timeout: 1000,
                position: 'top'
            })
        },
        detalhes(personagem){
            sessionStorage.setItem('personagem'+personagem.id, JSON.stringify(personagem))
            this.$router.push({name: 'Detalhes', params:{id: personagem.id}})
        }
    },
    beforeDestroy () {
        this.$q.loading.hide()

    }
}
</script>

<style>

</style>
