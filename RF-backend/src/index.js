import express from 'express';
import cors from 'cors';
import './db'
require('./mongoose')

const auth = require ('./middleware/auth')

const multer = require('multer')

const app = express()
const port = 3000

app.use(cors());
app.use(express.json())

//import storage from './memory_storage'; 

const Post = require ('./models/posts')
const User = require ('./models/users')
const City = require ('./models/gradovi')
const Profile = require ('./models/profil')
const Photo = require ('./models/photo')


//KORISNICI:

//registracija korisnika
app.post('/registracija', async (req,res)=>{
    const user = new User({...req.body})

    try{
        await user.save()
        const token = await user.getToken()
        res.status(201).send({user, token})
        console.log(req.body)
    }catch(error){
        console.log(req.body)
        res.status(400).send(error)
    }
})

//prijava korisnika
app.post('/prijava', async (req,res)=>{
    try{
        const user = await User.findByEmailAndPw(req.body.email, req.body.password)
        const token = await user.getToken()
        res.send({user, token})
    }catch(error){
        res.status(400).send()
    }
})

//odjava
app.post('/odjava', auth, async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    }catch(error){
        res.status(500).send()
    }
})

//profil korisnika
app.get('/profil', auth, async (req,res)=>{
    res.send(req.user)
})


//uredi profil korisnika
app.patch('/uredi-profil', auth, async (req, res)=>{
    console.log(req.body);
    const updates = Object.keys(req.body)
    const canUpdate = ['about', 'location', 'kontakt', 'interesi']
    const isValid = updates.every((update) => canUpdate.includes(update))
    if(!isValid){
        return res.status(400).send({error: 'Nije moguće urediti profil'})
    }
    
    try{
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    }catch(error){
        res.status(400).send(error)
    }
})

//promjena lozinke
app.patch('/promjena-lozinke', auth, async (req,res)=>{
    
    const updates = Object.keys(req.body)
    const canUpdate = ['password']
    const isValid = updates.every((update) => canUpdate.includes(update))

    if(!isValid){
        return res.status(400).send({error: 'Nije moguće promijeniti lozinku'})
    }
    
    try{
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    }catch(error){
        res.status(400).send(error)
    }
})

//dohvati drugog korisnika
app.get('/korisnik/:id', async (req, res) => {
    const _id = req.params.id
    try{
        let user = await User.findOne({_id})

        if(!user){
            return res.status(404).send()
        }

        res.send(user)
    }catch(error){
        res.status(500).send()
    }
})

//brisanje korisnika
app.delete('/obrisi-profil', auth,  async (req,res)=>{
    try{console.log('mmm')
        await req.user.remove()
        console.log('aaa')
        res.send(req.user)
    }catch(error){
        res.status(500).send(error)
        console.log(error)
    }
})



//OBJAVE:

//instanca multera koja se koristi kao middleware, provjerava da li slike/slika ima nastavak jpg...
const upload = multer({
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
            return cb(null, false)
        }
        cb(undefined, true)
    }
})


//sve objave (home page)
app.get('/', async (req,res)=>{
    try{
        const posts = await Post.find({}).sort({createdAt: -1}).limit(6).skip(parseInt(req.query.skip) * 6)
        res.send(posts)
    }catch(error){
        res.status(500).send(error)
    }
})

//dodajemo slike, prvo ucitamo sve slike i spremimo ih u db pa se samo onda id prosljedi ruti za dodavanje posta
function photoids(files,cb){
    let idsOfPhotos = []
    files.forEach(async photo =>{
        const newPhoto = new Photo({
            data: photo.buffer
        })
        await newPhoto.save()
        // let id = newPhoto._id
        idsOfPhotos.push(newPhoto._id)
        
    });
    setTimeout(function(){
        cb(idsOfPhotos)
    }, 500);
}

//nova objava
app.post('/nova-objava', auth, upload.array('photos', 12), async (req,res)=>{
    photoids(req.files, async function(idsOfPhotos) {
        console.log("druga", idsOfPhotos);
        try {
            const post = new Post({
                ...req.body,
                postedBy: req.user._id,
                idsOfPhotos,
                kontaktBroj: req.user.kontakt,
                kontaktMail: req.user.email
            })
            await post.save()
            res.status(201).send(post)
        } catch (error) {
            console.log(error);
            res.status(400).send(error)
        }
    })
})

//ruta za dohvacanje slike
app.get('/slika/:id', async (req, res) =>{
    try {
        let slika = await Photo.findById(req.params.id)
        if(!slika){
            return res.status(400)
        }
        res.set('Content-Type', 'image/png')
        console.log(slika);
        res.send(slika.data)
    } catch (error) {
        res.send(error)
    }
})

//pretraga objave po gradu
app.get('/objava/filter', auth, async (req,res)=>{
    
    try{
        const filter={}

    if(req.query.filter != 'undefined' && req.query.filter != null){
        let sea = new RegExp(`^.*${req.query.filter}.*$`, "img")
        filter['grad'] = sea
    }
        const onePost = await Post.find(filter)
        res.send(onePost)
    }catch(error){
        res.status(500).send()
    }
  
})

//pronadi objavu po id
app.get('/objava/:id', async (req,res)=>{
    const _id = req.params.id
    
    try{
        const post = await Post.findOne({_id})
        
        if(!post){
            return res.status(404).send()
        }

        res.send(post)
    }catch(error){
        res.status(500).send()
    }
})

//moje objave
app.get('/moje-objave', auth, async (req,res)=>{
    try{
        await req.user.populate('posts').execPopulate()
        res.send(req.user.posts)
    }catch(error){
        res.status(500).send()
    }
})


//uredi objavu po id
app.patch('/objava/uredi/:id', auth, async (req,res)=>{
    const updates = Object.keys(req.body)
    const canUpdate = ['cijena','zupanija','grad','naselje','ljubimci','dostupnoGod','terasa','ukljuceneRezije','odvojenaSoba']
    const isValid = updates.every((update) => canUpdate.includes(update))

    if(!isValid){
        return res.status(400).send({error: 'Nije moguće urediti objavu'})
    }
    
    try{
        const post = await Post.findOne({ _id: req.params.id, postedBy: req.user._id})

        if(!post){
            return res.status(404).send()
        }

        updates.forEach((update) => post[update] = req.body[update])
        await post.save()
        res.send(post)

    }catch(error){
        res.status(400).send(error)
    }
})

//brisanje objave po id
app.delete('/objava/obrisi/:id', auth,  async (req,res)=>{
    try{
        const post = await Post.findOneAndDelete({ _id: req.params.id, postedBy: req.user._id})

        if(!post){
            res.status(404).send()
        }
        res.send(post)
    }catch(error){
        res.status(500).send(error)
    }
})


//dodaj gradove
app.post('/gradovi-dodaj', async (req,res)=>{
    try{
        const gradovi = await City.find({})
        res.send(gradovi)
    }catch(error){
        res.status(500).send(error)
    }
})

//lista gradova
app.get('/gradovi', async (req,res)=>{
    const gradovi = new City(req.body)

    try{
        await gradovi.save()
        res.status(201).send(post)
    }catch(error){
        res.status(400).send(error)
    }
})

app.listen(port, () => console.log(`Slušam na portu ${port}!`))