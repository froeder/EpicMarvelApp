<template>
    <q-page padding>
        <span class="text-weight-thin">Detalhes sobre o personagem</span>
        <div>
            <q-card
                class="text-white"
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
                <q-btn flat round color="yellow" :icon="personagem.favs" @click="favorita(personagem)" />
                <q-btn flat round color="primary" icon="share" />
            </q-card-actions>
            </q-card>
    
            
            <q-card v-if="quadrinhos" style="background: radial-gradient(#fce700 0%, #fc9f00 100%)">
                <div class="text-center" v-if="!qtde_total">
                    <q-spinner-tail
                        color="purple"
                        size="5em"/>
                        Baixando Revistas
                </div>
                
                <q-card-section >
                    <span class="marvel" style="color:white">QUADRINHOS</span> <br>
                    <span v-if="qtde_total">O personagem aparece em {{qtde_total}} revistas.</span> <br>
                    <span>Aparições mais recentes do personagem:</span>
                    <q-timeline color="accent" style="border:1px 1px black">
                        <q-timeline-entry
                            v-for="comic in quadrinhos"
                            :title="comic.title"
                            :subtitle="converte(comic.dates[0].date)"
                        >
                            <q-btn outline @click="detalhesRevista(comic.id)">Ver detalhes</q-btn>
                        </q-timeline-entry>
                        
                    </q-timeline>
                </q-card-section>
            </q-card>     
        </div>
        <br>
        <span>Data provided by Marvel. © 2019 MARVEL</span>
    </q-page>
</template>

<script>
import MarvelApi from '../services/MarvelAPI'
import {Notify} from 'quasar'
import { QSpinnerFacebook } from 'quasar'
import {LocalStorage, SessionStorage} from 'quasar'

export default {
    data(){
        return{
            personagem: {},
            id: this.$route.params.id,
            quadrinhos: {},
            quadrinho: [],
            loading: true,
            qtde_total: 0
        }
    },
    mounted(){
        this.buscarPersonagens(this.id)
        this.loading = true
    },
    methods:{
        detalhesRevista(id){
            this.$router.push({name: 'DetalhesRevista', params:{id: id}})
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
                message: 'Biaxando Personagem',
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
            if(sessionStorage.getItem('quadrinhos'+id)){
                console.log('a')
                self.loading = false
                console.log(self.loading)
                self.quadrinhos = JSON.parse(sessionStorage.getItem('quadrinhos'+id))
                self.qtde_total = sessionStorage.getItem('qtde_quadrinho'+id)
                self.loading = false
            } else {
                MarvelApi.getCharacterComics(id, comics => {
                    let comic = comics.data.data.results
                    let total = comics.data.data.total
                    self.quadrinhos = comic
                    self.qtde_total = total
                    
                    sessionStorage.setItem('quadrinhos'+id, JSON.stringify(self.quadrinhos))
                    sessionStorage.setItem('qtde_quadrinho'+id, total)
                    self.loading = false
                }) 
            }
        },
        buscarPersonagens(){
            var self = this
            self.personagem = {}
           
            this.showLoading()
            self.personagem =  JSON.parse(sessionStorage.getItem('personagem'+self.id))
            console.log(self.personagem)
            self.buscaQuadrinhos(self.personagem.id)
            this.$q.loading.hide()
        
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

</style>
