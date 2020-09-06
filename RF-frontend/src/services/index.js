import axios from 'axios'

let Service = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000
})

var auth = {}

//je li user logiran
const isAuth = () =>{
    auth = {'Authorization' : 'Bearer ' + localStorage.getItem('token')}
}

//dohvacamo postove
let Posts = {
    async getAll(skip){
        return new Promise (async (resolve, reject)=>{
            try{
                let response = await Service.get(`/?skip=${skip}`)
                let data = response.data;
                resolve(
                    data.map(post => ({
                        ...post
                    }))
                );
            }catch(err){
                reject(err)
            }
        })
    },

    //dohvacamo 1 post
    async getPostById(id){
        return new Promise (async (resolve, reject)=>{
            try{
                let response = await Service.get('/objava/' + id)
                let data = response.data;
                resolve(data);
            }catch(err){
                reject(err)
            }
        })
    },

    //nova objava, provjera je li user logiran
    async addNew(data){
        isAuth()
            try{
                let axiosConfig = {
                    headers: {
                        'Authorization': auth['Authorization']
                    }
                  };
                return await Service.post('/nova-objava', data, axiosConfig)
            }catch(err){
                throw err.response;
            }
    },
    // axios koji dohvaca sliku
    async getPhoto(photoId){
        try{
            return await Service.get(`/slika/${photoId}`)
        }catch(error){
            throw error.response
        }
    }
}
//axios registracija
let User = {
 async register(form){
     try{
         return await Service.post('/registracija', form)
     } catch (err){
         throw err.response;
     }
 },

//prijava 
async Prijava(form){
     try {
         return await Service.post('/prijava', form)
     }catch(err){
         throw err.response;
     }
 },
//je li auth kako bi oso na profil
 async Profil(){
     isAuth()
     try{
         let axiosConfig = {
            headers: {
                'Authorization': auth['Authorization']
            }
          };
         return await Service.get('/profil', axiosConfig)
     }catch(err){
         throw err.response;
     }
 },

 //update profila - isto auth
 async UpdateProfile(form){
     
    isAuth()
    try {
        let axiosConfig = {
            headers: {
                'Authorization': auth['Authorization']
            }
        };
        return await Service.patch('/uredi-profil', form, axiosConfig)
    } catch (err) {
        throw err.response;
    }
 },

//promjeni loz
 async PromjenaLozinke(email){
    try{
        const res = await Service.post('/promjena-lozinke', {email})
        console.log('res', res);
        return res;
    }catch(err){
        console.log('error', err)
        throw err.response;

    }
 },
//nema
 async ObrisiProfil(){
     isAuth()
     try{
        return await Service.delete('/obrisi-profil', {auth})
     }catch(err){
        throw err.response;
     }
 },

 //dohvaca usera po id
 async GetUsernameById(id){
    return new Promise (async (resolve, reject)=>{
        try{
            let response = await Service.get('/korisnik/' + id)
            let data = response.data;
            resolve(data);
        }catch(err){
            reject(err)
        }
    })
}
}
export {  Service, Posts, User, auth }