<template> <!-- OVJDE IDE HOME-->
  <div class="box" >
    <div class="filter" >
      <p>FILTERI:</p>
      <form action="">
        <select @click="odabranaZupanija()" v-model="vrijednostZupanije" id = "zupanije" class="zupanija">
          <option value="" disabled selected class="undefined">Županija</option>
          <option value = "1">Bjelovarsko-bilogorska</option>
          <option value = "2">Brodsko-posavska</option>
          <option value = "3">Dubrovačko-neretvanska</option>
          <option value = "4">Istarska</option>
          <option value = "5">Karlovačka</option>
          <option value = "6">Koprivničko-križevačka</option>
          <option value = "7">Krapinsko-zagorska</option>
          <option value = "8">Ličko-senjska</option>
          <option value = "9">Međimurska</option>
          <option value = "10">Osječko-baranjska</option>
          <option value = "11">Požeško-slavonska</option>
          <option value = "12">Primorsko-goranska</option>
          <option value = "13">Sisačko-moslavačka</option>
          <option value = "14">Splitsko-dalmatinska</option>
          <option value = "15">Varaždinska</option>
          <option value = "16">Virovitičko-podravska</option>
          <option value = "17">Vukovarsko-srijemska</option>
          <option value = "18">Zadarska</option>
          <option value = "19">Zagrebačka</option>
          <option value = "20">Šibensko-kninska</option>
          <option value = "21">Grad Zagreb</option>
        </select>

      <select v-model="grad" id="gradovi" class="grad">
          <option v-for="grad in gradovi" :value="grad.grad" :key="grad.id">{{grad.grad}}</option>
      </select>
      
        <br>
        <br>
        <p>Cijena (kn):</p>
        <input v-model="cijenaOd" type="number" class="od_cijena"> do <input v-model="cijenaDo" type="number" class="do_cijena">

        <label for="ljubimci" style="word-wrap:break-word">
        Kućni ljubimci:
        <input v-model="ljubimci" type="checkbox" id="ljubimci" class="chkbox">
        </label>
        
        <label for="dostupno" style="word-wrap:break-word">
        Dostupno cijele godine:
        <input v-model="dostupno" type="checkbox" id="dostupno" class="chkbox">
        </label>

        <label for="soba" style="word-wrap:break-word">
        Odvojena soba:
        <input v-model="soba" type="checkbox" id="soba" class="chkbox">
        </label><br>

        <label for="terasa" style="word-wrap:break-word">
        Terasa/balkon:
        <input v-model="terasa" type="checkbox" id="terasa" class="chkbox">
        </label><br>

        <label for="rezije" style="word-wrap:break-word">
        Uključene režije:
        <input v-model="rezije" type="checkbox" id="rezije" class="chkbox">
        </label><br>

      <button v-on:click.prevent="primjeniFilter()" class="filter-btn" type="submit">Traži</button>
     </form>
    </div>

    <div>
      <router-link :to="{ name: 'Objava', params: { id: post._id }}" v-for="post in posts" :key="post._id" class="post">
        <br>
        <img class="d-block w-100 image" :src="`${photoBaseUrl}/slika/${post.idsOfPhotos[0]}`">
        {{post.grad}} <br>
        {{post.cijena}},00 kn
        <hr>
        {{post.opis}}
    </router-link> 
    </div>
    <div class="pag">  
        <nav aria-label="Page navigation example">
          <ul class="d-flex pagination justify-content-center">
            <li @click.prevent="prev()" class="page-item">
              <a class="page-link custom-page-link" href="#">Previous</a>
            </li>
            <li class="page-item active"><a class="page-link custom-active" href="#">{{stranica+1}}</a></li>
            <li @click.prevent="next()" class="page-item">
              <a class="page-link custom-page-link" href="#">Next</a>
            </li>
          </ul>
        </nav> 
      </div>  
    

    
            <!-- {{ `${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}`}} -->
       
                <!-- <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <img class="d-block w-100" src="..." alt="First slide">
                    </div>
                    <div class="carousel-item">
                      <img class="d-block w-100" src="..." alt="Second slide">
                    </div>
                    <div class="carousel-item">
                      <img class="d-block w-100" src="..." alt="Third slide">
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
                </div> -->
  </div>
  
</template>

<script>
import store from '@/store/store.js'
import { Service, Posts, User, auth } from '@/services/index.js'

//import {PostService} from '@/services/index.js'
  export default {
    name: 'Home',
    data(){
           
            return {
              stranica: 0,
              posts: [],
              error: '',
              gradovi: [],
              grad:'',
              vrijednostZupanije: '',
              cijenaOd: 0,
              cijenaDo: 99999,
              ljubimci: false,
              dostupno: false,
              terasa: false,
              rezije: false,
              soba : false,
              photoBaseUrl: '',
              store
            }
          },
    async created(){
      await this.getAll()
    },
    methods: {
      async getAll(){
        try{
         let data = await Posts.getAll(this.stranica);
         if(data.length === 0) return this.stranica--;
         console.log(data);
         let baseUrl = await Posts.getPhoto(data[0].idsOfPhotos[0])
         this.photoBaseUrl = baseUrl.config.baseURL
         this.posts = data
        }catch(err){
          console.log(err);
          this.error = err.message;
        }
      },
      async next(){
        this.stranica++
        await this.getAll()      
      },
      async prev(){
        this.stranica = --this.stranica < 0 ? 0 : this.stranica
        await this.getAll()
      },

      odabranaZupanija(){
         this.gradovi = this.$store.gradovi.filter((grad) =>{
           return grad.zupanija === parseInt(this.vrijednostZupanije)
         })
         console.log(this.grad);
      },
      
      async primjeniFilter(){
        try{
          let res = await Posts.getAll()
          this.posts = res
          
          let zupanijaStr = this.vrijednostZupanije
          if(zupanijaStr === '') {
            this.posts = [];
            return;
          }           
          if(zupanijaStr === undefined) zupanijaStr = '';

          this.posts = this.posts.filter((post) =>{
            
            console.log("post:", post)

            return post.cijena >= this.cijenaOd && post.cijena <= this.cijenaDo && 
                  ((zupanijaStr == '') ? (true) : (post.zupanija === zupanijaStr)) &&
                  ((this.grad === '') ? (true) : (post.grad === this.grad)) &&
                  ((this.ljubimci === false) ? (true) : (post.ljubimci === this.ljubimci)) &&
                  ((this.dostupno === false) ? (true) : (post.dostupnoGod === this.dostupno)) &&
                  ((this.soba === false) ? (true) : (post.odvojenaSoba === this.soba)) &&
                  ((this.rezije === false) ? (true) : (post.ukljuceneRezije === this.rezije)) &&
                  ((this.terasa === false) ? (true) : (post.terasa === this.terasa));         
        });
        console.log("post: ",post.grad)

        }catch(error){
          console.log('error',  error)

        }
        
      },
    },
     mounted() {
     },
     computed: {
       
     },
    
          
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.custom-page-link{
  background-color: #ebebeb;
  border-color: #ebebeb;
}

.custom-active{
  background-color: #F29422 !important;
  border-color: #F29422 !important;
  color:black !important;
}

.image{
  width: 70% !important;
  height: 200px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.pag{
    position: fixed;
    bottom: 0;
    left: 50%;
  }

  .filter {
    width: 270px;
    height: 462px;
    border: 2px #F29422 dashed;
    margin: 10px 23px;
    margin-top: 20px;
    background-color: #ebebeb;
    float: left;
    opacity: 0.97;
  }

  .filter-btn {
    margin-left: 100px;
    margin-top: 40px;
    border: 1px solid black;
    border-radius: 8px;
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px;
    background-color: white;
  }

    .filter-btn:hover{
      background-color: rgb(255, 167, 59);
      opacity: 0.8;
    }
  
//remove arrow
 input::-webkit-outer-spin-button,
 input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

  p{
    margin: 5px 5px;
  }

  .zupanija, .grad, .naselje, .od_cijena, .do_cijena {
    border-radius: 15px;
    padding-left: 8px;
    width: 200px;
    margin: 10px 10px auto;
    border: 1px #c7c7c7 solid;
  }
 
  .od_cijena, .do_cijena {
    border-radius: 15px;
    margin: 0 10px auto;
    margin-bottom: 10px;
    padding-left: 8px;
    width: 80px;
  }

 div .ponuda{
    float: left;
    width: auto;
 }

  .chkbox {
    width: 15px;
    margin-left: 10px;
    margin-top: 5px;
    
  }

  .post{
    margin-top: 20px;
    border: 1px #c7c7c7 solid;
    float: left;
    width: 490px;
    height: 350px;
    padding: 20px;
    margin-right: 30px;
    margin-bottom: 30px;
    background: white;
    opacity: 0.97;
    //text-transform: capitalize;
    
    text-align: justify;

    position:relative;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  label {
    margin-left: 15px;
  }

  a{
    color: inherit;
    text-decoration: none;
  }


//https://www.w3schools.com/howto/howto_js_slideshow.asp

</style>
