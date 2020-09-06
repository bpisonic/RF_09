<template> <!-- Globalna navigacija -->
  <div id="app">
    <nav class="navbar">
      <router-link to="/"><img alt="logo" src="@/assets/logor8.png"></router-link>
      <router-link to="/nova-objava" ><button class="objavi" v-if="store.user">OBJAVI</button></router-link>
      <router-link to="/profil" v-if="store.user">Profil</router-link>
      <router-link to="/prijava" v-if="!store.user">Prijava</router-link>
      <router-link to="/registracija" v-if="!store.user">Registracija</router-link> 
      <ul>
          <button class="objavi" v-if="store.user" @click.prevent="signout()">Odjava</button>
      </ul>
    </nav>
  
  </div>
</template>

<script>
//import store from '@/store'

import {User} from '@/services/index'
import store from '@/store/store'

export default {
  name: 'Nav',
  data() {
    return {
      store
    }
  },
  methods: {
    async signout(){
      //funkcija za logout
            try {
                await localStorage.removeItem("token");

                this.$store.user = false 
                this.$store.token = false
                this.$store.username = false
                console.log('ulogiran: ', this.$store.user)
                
                console.log('user i token: ', this.$store.username, this.$store.token)
                this.$router.push('/')
            } catch (error) {
               this.error = error
               console.log('error',error)
            }  
    },
  },
  async mounted(){
    //uzimamo token
    let token = await localStorage.getItem("token");
    console.log("navtoken: ", token)
    if(token != null) {
      let user = await User.Profil();
      this.$store.user = true;
      this.$store.username = user.data.username;
      console.log("user je: ", user)

    }
    console.log("navtoken: ", token)
  }
    
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.navbar {

  .objavi {
   
    color: black;
    border: 1px #FFBE3D solid;
    border-radius: 5px;
    margin-top: 20px;
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

  .btn{
    color:#FFBE3D;
    border: 2px, #FFBE3D solid;
    border-color: #FFBE3D;
  }

  .bth:hover{
    color: black;
    background: #FFBE3D;
    border-color: #ffbe3d;
  }

  .btn :focus{
    border-color: #F29422;;
  }
  
  a{
    color: inherit;
    text-decoration: none;
  }

}
</style>