<template>
    <q-page padding>
        <h1>Favss</h1>
    </q-page>
</template>

<script>
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
    let dado = localStorage.getItem('favorites')

    let teste = [dado]
    let testes = JSON.stringify(teste.toString())
    console.log(JSON.parse(testes))

    
  }
}
</script>


<style>

</style>
