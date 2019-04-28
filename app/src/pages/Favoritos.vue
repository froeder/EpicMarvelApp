<template>
    <q-page padding>
        <span class="text-weight-thin">Favoritos</span>
        <q-card
            class="text-white col col-6"
            v-for="personagem in personagens"
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
                <q-btn flat round color="yellow" :icon="favs" @click="favorita(personagem)" />
                <q-btn flat round color="primary" icon="share" />
            </q-card-actions>
        </q-card>
        <span>Data provided by Marvel. © 2019 MARVEL</span>
            
    </q-page>
</template>

<script>
import {LocalStorage} from 'quasar'

export default {
  name: 'PageIndex',
  data(){
    return{
      // personagem: [],
      personagens: {},
      favs: 'star'
    }
  },
  mounted(){
    this.pegaFavoritos()
  },
  methods:{
      pegaFavoritos(){
        let self = this
        let dado = localStorage.getItem('favorites')

        let aux = "["+ dado.toString() +"]"
        self.personagens = JSON.parse(aux)
      },
      favorita(personagem){
          console.log(personagem)
      }
  }
}
</script>


<style>

</style>
