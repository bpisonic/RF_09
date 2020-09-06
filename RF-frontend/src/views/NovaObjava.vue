<template>
    <div class="box" :style="{'background-image':'url(https://i.ibb.co/TbSNdGd/bg111.jpg)'}">
      <div class="filter">
        <form action=""> 
          <select id = "zupanije" @click="odabranaZupanija()" v-model="vrijednostZupanije" class="zupanija">
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
          </select><br>
          <select v-model="grad" id="gradovi" class="grad">
            <option :value="grad.grad" v-for="grad in gradovi" :key="grad.id">{{grad.grad}}</option>
        </select>

          <br>
          <br>
          <p>Cijena (kn):</p>
          <input v-model="cijena" type="number" class="cijena"><br>

          <label for="ljubimci" style="word-wrap:break-word">
          Kućni ljubimci:
          <input type="checkbox" id="ljubimci" class="chkbox" v-model="ljubimci">
          </label><br>
          
          <label for="dostupno" style="word-wrap:break-word">
          Dostupno cijele godine:
          <input type="checkbox" id="dostupno" class="chkbox" v-model="dostupno">
          </label><br>

          <label for="soba" style="word-wrap:break-word">
          Odvojena soba:
          <input type="checkbox" id="soba" class="chkbox" v-model="soba">
          </label><br>

          <label for="terasa" style="word-wrap:break-word">
          Terasa/balkon:
          <input type="checkbox" id="terasa" class="chkbox" v-model="terasa">
          </label><br>

          <label for="rezije" style="word-wrap:break-word">
          Uključene režije:
          <input type="checkbox" id="rezije" class="chkbox" v-model="rezije">
          </label><br>

          <p>Opis:</p>
          <textarea v-model="opis" class="opis" id="" cols="93" rows="10"></textarea>
          <!-- <input type="text" class="opis" v-model="opis"><br> -->
          
          <div class="form-group">    
                <label for="imageUrl">Select image </label>     
                 <input type="file" id="file" ref="file" name="photos" v-on:change="OcitajSliku()" multiple/>
           </div> 
          <button type="submit" @click.prevent="createPost()" class="objavi">Objavi</button>
          
        </form>
      </div>
    </div>
</template>

<script>
import store from '@/store/store.js'
import { Service, Posts, User, auth } from '@/services/index.js'


export default {
  name:'NovaObjava',
    data() {
      return {
              posts: [],
              error: '',
              gradovi: [],
              grad:'',
              vrijednostZupanije: '',
              cijena: 0,
              ljubimci: false,
              dostupno: false,
              terasa: false,
              rezije: false,
              soba : false,
              createdBy: '',
              opis:'',
              slike: [],
              store
            }
        //store
      },
    methods: {
      OcitajSliku(){
        console.log(this.$refs.file.files);
        this.$refs.file.files.forEach(photo =>{
          this.slike.push(photo)
        })
        console.log(this.slike);
      },
      odabranaZupanija(){
         this.gradovi = this.$store.gradovi.filter((grad) =>{
           return grad.zupanija === parseInt(this.vrijednostZupanije)
         })
         console.log(this.grad);
      },

      async createPost(){
        if(!this.$store.user) {
          console.log('Morate biti prijavljeni kako biste nastavili')
         this.$router.push('/prijava')
        }
        try{
          let today = new Date();
          let dateStr = today.getDate() + "/" + (today.getMonth()+1) + "/" + today.getFullYear();
          // let data = {
          //   postedAt : dateStr,
          //   createdBy : this.createdBy, 
          //   opis : this.opis,
          //   grad : this.grad,
          //   zupanija : this.vrijednostZupanije,
          //   cijena : this.cijena,
          //   ljubimci : this.ljubimci,
          //   dostupnoGod : this.dostupno,
          //   odvojenaSoba : this.soba,
          //   ukljuceneRezije : this.rezije,
          //   terasa : this.terasa
          // }
          let form = new FormData()
          this.$refs.file.files.forEach((photo, index) =>{
            console.log(index);
            form.append(`photos`, photo)
          })
          
          form.append('postedAt', dateStr)
          form.append('createdBy', this.createdBy)
          form.append('opis', this.opis)
          form.append('grad', this.grad)
          form.append('zupanija', this.vrijednostZupanije)
          form.append('cijena', this.cijena)
          form.append('ljubimci', this.ljubimci)
          form.append('dostupnoGod', this.dostupno)
          form.append('odvojenaSoba', this.soba)
          form.append('ukljuceneRezije', this.rezije)
          form.append('terasa', this.terasa)
          console.log(form);
          let res = await Posts.addNew(form)
          this.$router.push('/')
        }catch(error){
          this.error = error
          console.log(error)
        }
        //     console.log(this.body);
        //     this.db.posts.push(this.body)            
      }
    },
}
</script>


<style scoped>
 .box {
    height: 836px;
    width: 100%;
    
  }

.filter {
    width: 550px;
    height: 700px;
    border: 2px #F29422 dashed;
    margin: 60px 0px 0px 666px;
    background-color: #ebebeb;
    float: left;
    opacity: 0.97;
    padding-left: 50px;
    padding-top: 20px;
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
  

 input::-webkit-outer-spin-button,
 input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

  p{
    margin: 5px 5px;
  }

  .zupanija, .grad, .naselje, .cijena {
    border-radius: 15px;
    padding-left: 8px;
    width: 200px;
    margin: 10px 10px auto;
    border: 1px #c7c7c7 solid;
  }
 
  .cijena {
    border-radius: 15px;
    margin: 0 10px auto;
    margin-bottom: 10px;
    padding-left: 8px;
    width: 80px;
  }

  p{
    margin: 5px 5px;
  }

  .chkbox {
    width: 15px;
    margin-left: 10px;
    margin-top: 5px;
    
  }

  label {
    margin-left: 15px;
  }

  a{
    color: inherit;
    text-decoration: none;
  }
  .opis{
    border-radius: 10px;
    padding-left: 8px;
    width: 430px;
    height: 200px;
    margin: 10px 10px auto;
    border: 1px #c7c7c7 solid;
  }

  .objavi {
    
    text-align: left;
    color: black;
    border: 1px #FFBE3D solid;
    border-radius: 5px;
    margin-top: 20px;
    margin-left: 39px;
    width: 100px;
    height: 27px;
    background-color:#FFBE3D;
    font-family: 'catamaran';
    padding-top: 3px;
  }
    .objavi:hover{
      background-color: #F27405;
      border-color: #F2A922;
    } 
</style>