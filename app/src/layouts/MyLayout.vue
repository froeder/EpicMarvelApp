<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated 
      style="background: linear-gradient(to right, #CC0000 0%, #E30022 100%)">
      <q-toolbar>

        <q-toolbar-title>
          <span class="marvel">MARVEL</span>
        </q-toolbar-title>
        <q-btn
          flat
          dense
          round
          to="sobre"
          aria-label="Informações"
        >
          <q-icon name="info" />
        </q-btn>
      </q-toolbar>
      
    </q-header>

    <q-page-container style="background: radial-gradient(#FBCA03 0%, #B97D10 100%)">
      <transition
        name="transitions"
        enter-active-class="animated zoomIn"
        leave-active-class="animated zoomOut"
        mode="out-in"
      >
      <router-view />
      </transition>
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-tabs
        v-model="tab"
        inline-label
        class="text-white shadow-2"
        style="background: linear-gradient(to right, #CC0000 0%, #E30019 100%)">
        <q-tab name="random" icon="shuffle"/>
        <q-tab @click="$router.push('/')" name="home" icon="home" />
        <q-tab @click="$router.push('/favoritos')" name="star" icon="star"/> 
    </q-tabs>
    </q-footer>

  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      tab: 'mails'
    }
  },
  methods: {
    openURL,
    teste(){
      console.log('teste')
    }
  }
}
</script>

<style>
  .marvel{
     font-family: "Marvel";
     font-size: 2em ;
  }
</style>
