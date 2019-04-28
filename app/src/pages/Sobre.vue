<template>
    <q-page padding>
        <q-card
        class="text-white card-sobre"
        >
        <q-card-section>
            <div class="text-h6 typewriter">Informações sobre o aplicativo</div>
        </q-card-section>
        <q-separator color="yellow" inset />
        <q-card-section>
            V1.0.0 <br>
            Este aplicativo consome a API da Marvel, que retorna informações sobre seus personagens. <br> 
            A API pode ser acessada em https://developer.marvel.com . <br>
            Os textos são traduzidos usando a Google Cloud Translate API. <br><br>

            Para mais informações acesse meu github: github.com/froeder ou froeder.github.io     <br><br>



            <strong>MIT License </strong> <br>
            Copyright (c) 2019 Jhonatan Froeder

            
        </q-card-section>
        </q-card>
    </q-page>
</template>

<script>
export default {
    data () {
        return {
        
        }
    },
}
</script>

<style>
   .card-sobre{
        background:  radial-gradient(rgba(0, 238, 255, 0.9), rgba(0, 207, 239, 0.7));
        border-style: solid;
        border-width: 2px ;
        border-color: #00EEFF ;
        border-radius: 0px 40px 0px 40px ;
       height: 79vh
   }

   .typewriter{
        overflow: hidden; /* Ensures the content is not revealed until the animation */
        border-right: .1em solid blue; /* The typwriter cursor */
        white-space: nowrap; /* Keeps the content on a single line */
        margin: 0 auto; /* Gives that scrolling effect as the typing happens */
        animation: 
            typing 1.5s steps(50, end),
            blink-caret .85s step-end infinite;
    }

    /* The typing effect */
    @keyframes typing {
        from { width: 0 }
        to { width: 100% }
    }

    /* The typewriter cursor effect */
    @keyframes blink-caret {
        from, to { border-color: transparent }
        50% { border-color: #00EEFF; }
    }
</style>
