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
                <q-btn flat round color="black" icon="visibility" @click="detalhes(personagem)" />
                <q-btn flat round color="red" icon="delete" @click="remove(personagens, personagem)" />
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
        
        <br>
        <span>Data provided by Marvel. © 2019 MARVEL</span>
            
    </q-page>
</template>

<script>
import {LocalStorage} from 'quasar'
import {Notify} from 'quasar'
import SocialSharing from 'vue-social-sharing'

export default {
  name: 'PageIndex',
  data(){
    return{
      // personagem: [],
      personagens: [],
      favs: 'star',
      isHidden: false
    }
  },
  components:{
      SocialSharing
  },
  mounted(){
    this.pegaFavoritos()
  },
  methods:{
    pegaFavoritos(){
        let self = this
        var 
        keys = Object.keys(localStorage),
        i = 0, key;

        for (; key = keys[i]; i++) {
            self.personagens.push(JSON.parse(localStorage.getItem(key)));
        }
    },
    remove(personagens, personagem){
         let nome = personagem.nome
        
        localStorage.removeItem(personagem.nome+personagem.id)
       

        Notify.create({
            color: 'positive',
            message: nome +' foi removido dos favoritos',
            timeout:1000,
            position: 'top'
        })

        for(var i in personagens){
            if(personagem.nome === personagens[i].nome){
                personagens = personagens.splice(i, 1)
            }
        } 
    },
    detalhes(personagem){
        this.$router.push({name: 'Detalhes', params:{id: personagem.id }})
        sessionStorage.setItem('personagem'+personagem.id, JSON.stringify(personagem)) 
    }
  }
}
</script>


<style>

</style>
