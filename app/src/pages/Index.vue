<template>
  <q-page padding>
    <q-card
      class="my-card text-white"
      style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
    >
      <img :src="imagem">
      <q-card-section>
        <div class="text-h6">{{personagem.name}}</div>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>

      <q-card-section>
        teste
      </q-card-section>
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
      personagem: []
    }
  },
  mounted(){
    this.baixarPersonagens()
  },
  methods:{
    baixarPersonagens(){
      var self = this
      MarvelApi.getAllCharacters(1, characters => {
        self.personagem = characters.data.data.results[0]

        self.imagem = self.personagem.thumbnail.path + '.jpg'
        console.log(characters.data.data.results[0])
      })

    }
  }
}
</script>