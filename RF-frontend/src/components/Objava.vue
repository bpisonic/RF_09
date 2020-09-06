<template>
    <div class="box" :style="{'background-image':'url(https://i.ibb.co/TbSNdGd/bg111.jpg)'}"> 
        <div v-if="post" class="box2">
            <ul>
                <router-link :to="{ name: 'User_objave', params: { id: post.userId }}">
                    <p class="postedBy">Objavio/la: <strong>{{post.postedBy}}</strong></p>
                </router-link>
                <li class="postedAt">Objavljeno: <strong>{{post.postedAt}}</strong></li><br>
                <li class="postedAt">Kontakt broj: <strong>{{post.kontaktBroj}}</strong></li><br>
                <li class="postedAt">Kontakt mail: <strong>{{post.kontaktMail}}</strong></li>
                <br><br>
                

                <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img class="d-block w-100" :src="`${photoBaseUrl}/slika/${post.idsOfPhotos[0]}`" alt="First slide">
                        </div>
                        <div class="carousel-item" v-for="photoId in post.idsOfPhotos.slice(1)" :key="photoId">
                            <img class="d-block w-100" :src="`${photoBaseUrl}/slika/${photoId}`" alt="Second slide">
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
              

                <li><strong>Cijena: </strong>{{post.cijena}} kn</li>
                <li class="margin"><strong>Županija:</strong> {{post.zupanija}}</li>
                <li class="margin"><strong>Grad:</strong> {{post.grad}}</li>
                
                    <form action="">
                        <label  for=""><strong>Dostupno preko godine: </strong>
                            <input v-if="post.dostupnoGod" checked disabled type="checkbox" class="check" id="">
                            <input v-if="!post.dostupnoGod" disabled type="checkbox" class="check" id="">
                        </label><br>
                        
                        <label  for=""><strong>Dopušteni kućni ljubimci: </strong>
                            <input v-if="post.ljubimci" checked disabled type="checkbox" class="check" id="">
                            <input v-if="!post.ljubimci" disabled type="checkbox" class="check" id="">
                        </label><br>

                        <label  for=""><strong>Odvojena soba: </strong>
                            <input v-if="post.odvojenaSoba" checked disabled type="checkbox" class="check" id="">
                            <input v-if="!post.odvojenaSoba" disabled type="checkbox" class="check" id="">
                        </label><br>

                        <label  for=""><strong>Ima balkon/terasu: </strong>
                            <input v-if="post.terasa" checked disabled type="checkbox" class="check" id="">
                            <input v-if="!post.terasa" disabled type="checkbox" class="check" id="">
                        </label><br>

                        <label  for=""><strong>Režije uključene u cijenu: </strong>
                            <input v-if="post.ukljuceneRezije" checked disabled type="checkbox" class="check" id="">
                            <input v-if="!post.ukljuceneRezije" disabled type="checkbox" class="check" id="">
                        </label><br><hr>
                    </form>
                <li class="opis"><strong>Opis: </strong>{{post.opis}}</li>
            </ul>
        </div>
    </div>   
</template>

<script>
import { Posts, User } from '@/services/index.js'
import store from '@/store/store.js'
export default {
    name: 'Objava',
    data(){
        return {
            post: null,
            photoBaseUrl: ''
        }
    },
    async mounted(){
        //dohvacamo id posta
        console.log("ovo je id: ", this.$route.params.id)
        this.post = await Posts.getPostById(this.$route.params.id)
        console.log(this.post);
        //dohvacamo baseURL-a
        let baseUrl = await Posts.getPhoto(this.post.idsOfPhotos[0])
        this.photoBaseUrl = baseUrl.config.baseURL
        //mijenjamo zupanije u string zbog bolje usporedbe kasnije
        this.post.zupanija = this.$store.zupanijeIdToStr[this.post.zupanija]
        this.post.userId = this.post.postedBy
        this.post.postedBy = (await User.GetUsernameById(this.post.postedBy)).username;
        console.log("this.post: ", this.post)

    }


}
</script>

<style scoped>

label, .margin{
    margin-top: 7px;
}

.box {
    height: 836px;
    width: 100%;
    padding-top: 70px;
  }

.box2 {
    margin: auto;
    width: 800px;
    height: auto;
    border: 1px black solid;
    padding:10px 20px;
    padding-top: 20px;
    background-color: #ebebeb;
    opacity: 0.9;
}

ul{
    list-style:none;
}

.postedAt{
    float: left;
}

.postedBy{
    float: right;
}

.opis{
    width: 670px;
    text-align: justify;
}

.check{
    float: right;
    margin-top: 7px;
    margin-left: 10px;
}

.slide{
    width: 60%;
    margin-left: auto;
    margin-right: auto;

}
a{
    text-decoration: none;
    color: #aa7100;
}
</style>