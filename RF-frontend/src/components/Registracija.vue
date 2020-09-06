<template>
     <div class="box" :style="{'background-image':'url(https://i.ibb.co/TbSNdGd/bg111.jpg)'}">
                <div class="signup">
                    <form @submit.prevent="register" method="post"> 
                        <p class="txt">Kreirajte račun:</p>
                            <ul>
                                <li class="txt">Email:</li>
                                <input v-model="body.email" type="email" placeholder="primjer@mail.com">

                                <li class="txt">Korisničko ime:</li>
                                <input v-model="body.username" type="username" placeholder="Korisnik123">

                                <li class="txt">Kontakt:</li>
                                <input v-model="body.kontakt" type="number" placeholder="xxx-xxx-xxxx">

                                <li class="txt">Lokacija:</li>
                                <input v-model="body.location" type="text" placeholder="Grad">

                                <li class="txt">Lozinka:</li>
                                <input v-model="body.password" type="password" placeholder="Lozinka">

                                <li class="txt">Potvrda lozinke:</li>
                                <input v-model="confirmPassword" type="password" placeholder="Potvrda lozinke">
                                
                                <!--<button @click.prevent="register()" class="submit">SUBMIT</button> -->
                                <input class ="submitt" type="submit"  value="POTVRDI">
                            </ul>
                    </form>
                </div>
            </div>
</template>


<script>
import  {User}  from '@/services/index.js';

export default {

    name: 'Registracija',
    data() {
        return {
            body:{
                email: '',
                username: '',
                password: '',
                kontakt: '',
                location: ''
            },
            confirmPassword: '',
            error: '',
            //pw:'password'
        }
    },
    methods: {
        async register(){ //registracija korisnika
            if(this.body.password != this.confirmPassword) return this.error = "Lozinke se moraju podudarati!"
            try {
                let res = await User.register(this.body)
                console.log("res.data: ", res.data)
                this.$store.user = true
                this.$store.token = res.data.token
                this.$store.username = res.data.user.username
                console.log(this.$store.user.username)
                localStorage.setItem("token", res.data.token);
                this.$router.push('Profil')
                console.log(res);
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


div .signup{
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
        width: 300px;
        height: 25px;
        padding-left: 10px;
        margin:auto;
        margin-top: 10px;
        
    }

    .submitt {
        
        border-radius: 15px;
        margin-top: 30px;
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