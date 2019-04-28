<template>
  <q-page padding>
     <q-input  style="color:white" @change="buscarPersonagens(busca)" dark dense standout v-model="busca" input-class="text-left" placeholder="Digite o nome do personagem">
      <template v-slot:append>
        <q-icon v-if="busca === ''" name="search" />
        <q-icon v-else name="clear" class="cursor-pointer" @click="busca = ''" />
      </template>
    </q-input>
    <br>
    <q-card
      class="text-white"
      v-if="personagem.name"
      style="background-color:#8E7D6B"
    > 
      <q-img
        :src="imagem"
      >
        <div class="absolute-bottom text-subtitle2 text-center">
          {{personagem.name}}
        </div>
      </q-img>

      <q-card-section>
        {{descricao}}
      </q-card-section>
      <q-card-actions align="around">
        <q-btn flat round color="black" icon="visibility" />
        <q-btn flat round color="yellow" icon="star" />
        <q-btn flat round color="primary" icon="share" />
      </q-card-actions>
    </q-card> 
    
  </q-page>
</template>

<style>
</style>

<script>
import MarvelApi from '../services/MarvelAPI'
import {Notify} from 'quasar'
import { QSpinnerFacebook } from 'quasar'

export default {
  name: 'PageIndex',
  data(){
    return{
      personagem: [],
      descricao: '',
      imagem: '',
      busca:''
    }
  },
  mounted(){
    // this.baixarPersonagens()
    
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
    traduz(personagem){
      var self = this
      let texto = personagem.toString()
      if(texto == ''){
        self.descricao = 'Sem descrição'
      } else {
        console.log(personagem)
        var googleTranslate = require('google-translate')('AIzaSyC_Vt7D6DAWGohSGOFmD6urdGCvcoodmts');
        googleTranslate.translate(texto, 'pt', function(err, translation) {
          self.descricao = translation.translatedText
        });
      }        
     
    },
    buscarPersonagens(nome){
      var self = this
      self.personagem = []
      self.descricao = ''
      this.showLoading()
      MarvelApi.getAllCharacters(nome, characters => {
        let resultado = characters.data.data.results
        if(resultado.length > 0){
          this.traduz(characters.data.data.results[0].description)
          self.personagem = characters.data.data.results[0]
          self.imagem = self.personagem.thumbnail.path + '.jpg'

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
  },
   beforeDestroy () {
    
      this.$q.loading.hide()
    
  }
}
</script>