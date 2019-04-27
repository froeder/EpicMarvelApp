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
        {{personagem.description || 'Sem informação'}}
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

export default {
  name: 'PageIndex',
  data(){
    return{
      personagem: [],
      imagem: '',
      busca:''
    }
  },
  mounted(){
    // this.baixarPersonagens()
  },
  methods:{
    buscarPersonagens(nome){
      var self = this
      self.personagem = []

      MarvelApi.getAllCharacters(nome, characters => {
        let resultado = characters.data.data.results
        if(resultado.length > 0){
          self.personagem = characters.data.data.results[0]
          self.imagem = self.personagem.thumbnail.path + '.jpg'
        } else{
          console.log('nao encontrado')
        }
        
      })
    }
  }
}
</script>