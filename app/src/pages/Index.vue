<template>
  <q-page padding>
    <span class="text-weight-thin">Página Inicial</span>
     <q-input  style="color:white" @change="buscarPersonagens(busca)" dark dense standout v-model="busca" input-class="text-left" placeholder="Digite o nome do personagem">
      <template v-slot:append>
        <q-icon v-if="busca === ''" name="search" />
        <q-icon v-else name="clear" class="cursor-pointer" @click="busca = ''" />
      </template>
    </q-input>
    <span v-if="busca === ''" class="text-weight-light">O nome deve estar em inglês</span>
    <br>
    <q-card
      class="text-white"
      v-for="personagem in personagens"
      :key="personagem.nome"
      style="background-color:#8E7D6B ; margin-bottom:1em"
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
        <q-btn flat round color="black" icon="visibility" />
        <q-btn flat round color="yellow" :icon="personagem.favs" @click="favorita(personagem)" />
        <q-btn flat round color="primary" icon="share" />
      </q-card-actions>
    </q-card>
    <span v-if="personagens.nome != []">{{atribuicao}}</span>
  </q-page>
</template>

<style>
</style>

<script>
import MarvelApi from '../services/MarvelAPI'
import {Notify} from 'quasar'
import { QSpinnerFacebook } from 'quasar'
import {LocalStorage} from 'quasar'

export default {
  name: 'PageIndex',
  data(){
    return{
      // personagem: [],
      personagens: [],
      atribuicao: '',
      busca:''
    }
  },
  mounted(){
    // this.baixarPersonagens()
    console.log('abriu')
    
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
          self.personagens.push({
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
      if(nome!=''){
        var self = this
        this.personagens = []
        this.showLoading()
        MarvelApi.getAllCharacters(nome, characters => {
          let resultado = characters.data.data.results
          self.atribuicao = characters.data.attributionText
          if(resultado.length > 0){
            this.traduz(resultado)
            this.$q.loading.hide()
          } else{
            this.$q.loading.hide()
            Notify.create({
              message: 'Nenhum personagem encontrado',
              timeout: 1500
            })
          }
          
        })
      }
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
    }
  },
   beforeDestroy () {
    this.$q.loading.hide()
  }
}
</script>