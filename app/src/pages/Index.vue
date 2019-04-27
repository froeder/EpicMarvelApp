<template>
  <q-page padding>
    <!-- <q-card
      class="my-card text-white"
      style="background: radial-gradient(circle, #D3AF37 0%, #D3AF37 100%)"
    > 
      <q-img
        :src="imagem"
        basic
      >
        <div class="absolute-bottom text-subtitle2 text-center">
          {{personagem.name}}
        </div>
      </q-img>

      <q-card-section>
        {{personagem.description}}
      </q-card-section>
      <q-card-actions align="around">
        <q-btn flat round color="black" icon="visibility" />
        <q-btn flat round color="yellow" icon="star" />
        <q-btn flat round color="primary" icon="share" />
      </q-card-actions>
    </q-card> -->
    
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
      imagem: ''
    }
  },
  mounted(){
    // this.baixarPersonagens()
  },
  methods:{
    baixarPersonagens(){
      var self = this
      MarvelApi.getAllCharacters(1, characters => {
        self.personagem = characters.data.data.results[0]

        self.imagem = self.personagem.thumbnail.path + '.jpg'
        
        
      })

    }
  }
}
</script>