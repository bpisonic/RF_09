<template>
    <div class="box" :style="{'background-image':'url(https://i.ibb.co/TbSNdGd/bg111.jpg)'}">
                <div class="login">
                    <form @submit.prevent="login" method="get">
                    <p class="txt">Prijava:</p>
                        <ul>
                            <li class="txt">Email:</li>
                            <input placeholder="primjer@gmail.com" v-model="body.email" type="email" class="enter-email" required>

                            <li class="txt">Lozinka:</li>
                            <input placeholder="Lozinka" v-model="body.password" type="password" class="enter-pw" required><br>

                            <input @click.prevent="login()" type="submit" value ="PRIJAVA" class="submit">
                        </ul>
                    </form>
                </div>
    </div>
</template>


<script>
import {User} from '@/services/index'
import store from '@/store/store'
export default {
    name: 'Prijava',
    data() {
        return {
            body:{
                email: '',
                password: '',
                username: ''
            },
            error: '',
            store
        }
    },
    methods:{
        async login(){
            try { //prijava korisnika
                let res = await User.Prijava(this.body)
                this.$store.user = true
                console.log('hoce1')
                this.$store.token = res.data.token
                                console.log('hoce2')
                                console.log(this.$store.user)

                this.$store.username = res.data.user.username
                                console.log('hoce3')

                console.log(this.$store.username)
                                console.log('hoce4')

                await localStorage.setItem("token", res.data.token);
                this.$router.push('Profil')
            } catch (error) {
                this.error = error
                console.log(error)
            }  
            
        }
    }    
}
</script>


<style scoped>

.box {
    height: 836px;
    width: 100%;
    padding-top: 70px;

  }

div .login{
    border: 1px #8a8a8a solid;
    width: 450px;
    height: auto;
    padding: 20px;
    margin: auto;
    margin-top:50px;
    background-color: #ebebeb;
    opacity: 0.9;
}


div ul li {
        list-style: none;
        padding-top: 20px;
        padding-bottom: 3px;
        font-family: 'Nunito', sans-serif;
    }

    input {
        border: 1px #8a8a8a solid;
        border-radius: 15px;
        width: 320px;
        height: 25px;
        padding-left: 10px;
        margin:auto;
        
    }

    .submit {
        
        border-radius: 15px;
        margin-top: 20px;
        width: 100px;
        height: 25px;
        background-color:#FFBE3D;
        font-family: 'catamaran';
        padding-bottom: 5px;
        border: 1px #FFBE3D solid;
    }
    
    .submit:hover {
        background-color:#F2921D;
    }

    .txt{
        font-family: 'Catamaran', sans-serif;
        font-style: italic;
        font-size: 18px;
        margin-left: 23px;
    }
</style>