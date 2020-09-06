<template>
    <div class="box" :style="{'background-image':'url(https://i.ibb.co/TbSNdGd/bg111.jpg)'}">
        <div >
            
            <p class="welcome" v-if="this.$store.user = true">Dobrodošao/la <strong>{{user2.username}}</strong> </p> 
            <div class="box2">
                <ul>
                    <li class="left">Lokacija: 
                        <input type="text" v-model="user2.location" :disabled="change">
                    </li>
                    <li class="right"><button @click="Change()">Uredi profil</button></li>
                    <li class="right"><button v-if="!change" @click="UpdateProfile()">Update profile</button></li>

                    <br><br>
                    <li class="left">Kontakt broj: 
                        <input type="text" v-model="user2.kontakt" :disabled="change">
                    </li>
                    <br><br>
                    <li class="left">E-mail: 
                        <input type="text" v-model="user2.email" disabled>
                    </li>
                    <br><br>

                    <div class="left">Interesi:
                        <input type="text" v-model="user2.interesi" placeholder="interesi" :disabled="change">
                    </div>

                    <br><br>
                    <li>O meni:</li> <textarea v-model="user2.about" name="" id="" cols="93" rows="10" :disabled="change"></textarea>
                </ul>
                

            </div>
        </div>
    </div>
</template>


<script>
import {User} from '@/services/index'
import store from '@/store/store'

export default {
name: 'Profil' ,   

data() {
    return {
        user:{
            username:''
        },
        error: '',
        store,
        interesi: '',
        user2: {},
        oMeni: '',
        change: 1
    }
},
async created(){
      try{
        let data = await User.Profil();
        this.user2 = data.data
        console.log(data)
      }catch(error){
        this.error = error.message;
      }
    },
methods: {
    Change(){
        this.change = !this.change
    },
    async UpdateProfile(){
        try {
            let form = this.user2
            delete form.email
            delete form._id
            delete form.__v
            delete form.username

            let data = await User.UpdateProfile(form)
            this.user2 = data.data
            console.log(data);
        } catch (error) {
           console.log(error);
        }
    }
},
}
</script>


<style lang="scss" scoped>

.box2 {
    margin: auto;
    width: 800px;
    height: fit-content;
    border: 1px black solid;
    padding:10px 20px;
    background-color: #ebebeb;
    opacity: 0.9;

}

.welcome{
    padding: 10px;
    text-align: center;
    font-size: 25px;
    text-shadow: 2px 2px 4px white;
}

input{
    border-radius: 15px;
    margin-left: 10px;
    margin-bottom: 10px;
    padding-left: 8px;
}

.interesi{
    width: 600px;
    height: auto;
    margin: auto;
    margin-top: 20px;
    padding-top: 20px;
    // border: 1px black solid;
    background-color: #ebebeb;
}

ul{
    list-style: none;
    margin-top: 20px;
}

.right{
    float: right;
    margin-right: 20px;
}
.left{
    float: left;
}
</style>