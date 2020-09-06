
let store = {
  user: false,
  token: '',
  username: '',

  gradovi:[
    { 
      grad: 'Bjelovar', 
      zupanija: 1,
    },
    { 
      grad: 'Daruvar', 
      zupanija: 1
    },
    {
      grad: 'Nova Gradiška',
      zupanija: 2
    },
    {
      grad: 'Slavonski Brod',
      zupanija: 2
    },
    {
      grad: 'Dubrovnik',
      zupanija: 3
    },
    {
      grad: 'Korčula',
      zupanija: 3
    },
    {
      grad: 'Pula',
      zupanija:  4
    },
    {
      grad: 'Pazin',
      zupanija: 4
    },
    {
      grad: 'Poreč',
      zupanija: 4
    },
    {
      grad: 'Novigrad',
      zupanija: 4
    },
    {
      grad: 'Rovinj',
      zupanija: 4
    },
    {
      grad: 'Umag',
      zupanija: 4
    },
    {
      grad: 'Karlovac',
      zupanija: 5
    },
    {
      grad: 'Ogulin',
      zupanija: 5
    },
    {
      grad: 'Koprivnica',
      zupanija: 6
    },
    {
      grad: 'Križevci',
      zupanija: 6
    },
    {
      grad: 'Krapina',
      zupanija: 7
    },
    {
      grad: 'Gospić',
      zupanija: 8
    },
    {
      grad: 'Novalja',
      zupanija: 8
    },
    {
      grad: 'Senj',
      zupanija: 8
    },
    {
      grad: 'Čakovec',
      zupanija: 9
    },
    {
      grad: 'Đakovo',
      zupanija: 10
    },
    {
      grad: 'Našice',
      zupanija: 10
    },
    {
      grad: 'Osijek',
      zupanija: 10
    },
    {
      grad: 'Kutjevo',
      zupanija: 11
    },
    {
      grad: 'Lipik',
      zupanija: 11
    },
    {
      grad: 'Požega',
      zupanija: 11
    },
    {
      grad: 'Rijeka',
      zupanija: 12
    },
    {
      grad: 'Cres',
      zupanija: 12
    },
    {
      grad: 'Crikvenica',
      zupanija: 12
    },
    {
      grad: 'Krk',
      zupanija: 12
    },
    {
      grad: 'Mali Lošinj',
      zupanija: 12
    },
    {
      grad: 'Novi Vinodolski',
      zupanija: 12
    },
    {
      grad: 'Opatija',
      zupanija: 12
    },
    {
      grad: 'Rab',
      zupanija: 12
    },
    {
      grad: 'Kutina',
      zupanija: 13
    },
    {
      grad: 'Novska',
      zupanija: 13
    },
    {
      grad: 'Sisak',
      zupanija: 13
    },
    {
      grad: 'Petrinja',
      zupanija: 13
    },
    {
      grad: 'Hvar',
      zupanija: 14
    },
    {
      grad: 'Omiš',
      zupanija: 14
    },
    {
      grad: 'Split',
      zupanija: 14
    },
    {
      grad: 'Trogir',
      zupanija: 14
    },
    {
      grad: 'Vis',
      zupanija: 14
    },
    {
      grad: 'Varaždin',
      zupanija: 15
    },
    {
      grad: 'Slatina',
      zupanija: 16
    },
    {
      grad: 'Virovitica',
      zupanija: 16
    },
    {
      grad: 'Vukovar',
      zupanija: 17
    },
    {
      grad: 'Vinkovci',
      zupanija: 17
    },
    {
      grad: 'Zadar',
      zupanija: 18
    },
    {
      grad: 'Biograd na moru',
      zupanija: 18
    },
    {
      grad: 'Pag',
      zupanija: 18
    },
    {
      grad: 'Dugo Selo',
      zupanija: 19
    },
    {
      grad: 'Ivanić Grad',
      zupanija: 19
    },
    {
      grad: 'Samobor',
      zupanija: 19
    },
    {
      grad: 'Velika Gorica',
      zupanija: 19
    },
    {
      grad: 'Zaprešić',
      zupanija: 19
    },
    {
      grad: 'Knin',
      zupanija: 20
    },
    {
      grad: 'Šibenik',
      zupanija: 20
    },
    {
      grad: 'Zagreb',
      zupanija: 21
    }
  ],
  zupanijeIdToStr : {
    "1": "Bjelovarsko-bilogorska",
    "2": "Brodsko-posavska",
    "3": "Dubrovačko-neretvanska",
    "4": "Istarska",
    "5": "Karlovačka",
    "6": "Koprivničko-križevačka",
    "7": "Krapinsko-zagorska",
    "8": "Ličko-senjska",
    "9": "Međimurska",
    "10": "Osječko-baranjska",
    "11": "Požeško-slavonska",
    "12": "Primorsko-goranska",
    "13": "Sisačko-moslavačka",
    "14": "Splitsko-dalmatinska",
    "15": "Varaždinska",
    "16": "Virovitičko-podravska",
    "17": "Vukovarsko-srijemska",
    "18": "Zadarska",
    "19": "Zagrebačka",
    "20": "Šibensko-kninska",
    "21": "Grad Zagreb"
  }
}

// let store = {
//   posts: [
//     { 
//       //postedAt
//       //postedBy
//       id: 1,
//       cijena: 3000,
//       zupanija: 'Splitsko-dalmatinska',
//       grad: 'Split',
//       naselje: '',
//       ljubimci: true,
//       dostupnoGod: false,
//       odvojenaSoba: true,
//       terasa: true,
//       ukljuceneRezije: true,
//       opis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida.'
//     },
//     { 
//       id: 2,
//       cijena: 1800,
//       zupanija: 'Istarska',
//       grad: 'Pula',
//       naselje: 'Gregovica',
//       ljubimci: true,
//       dostupnoGod: true,
//       odvojenaSoba: true,
//       terasa: true,
//       ukljuceneRezije: true,
//       opis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec gravida tincidunt mi, vel semper nisl molestie eget. Duis porttitor imperdiet.'
//     },
//     { 
//       id: 3,
//       cijena: 1234,
//       zupanija: 'Zadarska',
//       grad: 'Zadar',
//       naselje: '',
//       ljubimci: false,
//       dostupnoGod: false,
//       odvojenaSoba: true,
//       terasa: true,
//       ukljuceneRezije: false,
//       opis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dui erat, mollis vel libero.'
//     },
//     { 
//       id: 4,
//       cijena: 2000,
//       zupanija: 'Primorsko-goranska',
//       grad: 'Rijeka',
//       naselje: '',
//       ljubimci: true,
//       dostupnoGod: true,
//       odvojenaSoba: true,
//       terasa: false,
//       ukljuceneRezije: true,
//       opis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rhoncus, elit molestie viverra facilisis, mi justo pulvinar est, pharetra aliquam dui sem quis.'
//     },
//     { 
//       id: 5, 
//       cijena: 750,
//       zupanija: 'Osječko-baranjska',
//       grad: 'Osijek',
//       naselje: '',
//       ljubimci: false,
//       dostupnoGod: true,
//       odvojenaSoba: true,
//       terasa: false,
//       ukljuceneRezije: false,
//       opis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas metus justo, luctus at vestibulum ut, blandit nec sapien. Quisque ut maximus tortor. Morbi fringilla dolor tortor, luctus venenatis lectus pellentesque eu. Pellentesque consequat velit.'
//     },
//     { 
//       id: 6,
//       cijena: 1100,
//       zupanija: 'Istarska',
//       grad: 'Pula',
//       naselje: 'Kastanjer',
//       ljubimci: true,
//       dostupnoGod: true,
//       odvojenaSoba: false,
//       terasa: true,
//       ukljuceneRezije: false,
//       opis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non tellus id lorem sodales efficitur. Morbi iaculis mauris in mauris dapibus finibus. Fusce rutrum ante magna, sed semper.'
//     },
//     { 
//       id: 7,
//       cijena: 1400,
//       zupanija: 'Istarska',
//       grad: 'Pula',
//       naselje: '',
//       ljubimci: true,
//       dostupnoGod: true,
//       odvojenaSoba: false,
//       terasa: false,
//       ukljuceneRezije: false,
//       opis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget turpis dapibus, aliquam dui auctor, scelerisque ligula. Mauris arcu massa, porta in quam in, vulputate pretium nisi. Aliquam vitae augue at sapien sollicitudin ullamcorper. Morbi arcu mi, pellentesque vitae dapibus molestie, ultrices at tortor. Aenean imperdiet pellentesque mi, sit amet sollicitudin turpis semper congue. Etiam sit amet malesuada mi, sit.'
//     },
//     { 
//       id: 8,  
//       cijena: 1740,
//       zupanija: 'Grad Zagreb',
//       grad: 'Zagreb',
//       naselje: 'Vrapce',
//       ljubimci: false,
//       dostupnoGod: true,
//       odvojenaSoba: true,
//       terasa: false,
//       ukljuceneRezije: true,
//       opis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta sem leo, at volutpat orci congue ut. Phasellus vehicula luctus ligula, non ullamcorper ante sagittis ut. Integer ullamcorper orci ipsum, vitae rutrum neque venenatis vitae. Aenean pulvinar id nisl a tincidunt. Fusce faucibus sem at.'
//     },
//     { 
//       id: 9,  
//       cijena: 2000,
//       zupanija: 'Grad Zagreb',
//       grad: 'Zagreb',
//       naselje: '',
//       ljubimci: true,
//       dostupnoGod: true,
//       odvojenaSoba: true,
//       terasa: false,
//       ukljuceneRezije: false,
//       opis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas volutpat ullamcorper nisi vitae pharetra. Phasellus.'
//     },
//     { 
//       id: 10,  
//       cijena: 1350,
//       zupanija: 'Zadarska',
//       grad: 'Zadar',
//       naselje: '',
//       ljubimci: false,
//       dostupnoGod: true,
//       odvojenaSoba: true,
//       terasa: false,
//       ukljuceneRezije: false,
//       opis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et blandit mauris. Cras tincidunt dignissim augue, non rhoncus orci condimentum lobortis. Sed hendrerit quis nisl a molestie.'
//     },
//     { 
//       id: 11,  
//       cijena: 1000,
//       zupanija: 'Istarska',
//       grad: 'Pula',
//       naselje: 'Veruda',
//       ljubimci: false,
//       dostupnoGod: true,
//       odvojenaSoba: true,
//       terasa: true,
//       ukljuceneRezije: false,
//       opis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in feugiat.'
//     },
//     { 
//       id: 12,
//       cijena: 1500,
//       zupanija: 'Primorsko-goranska',
//       grad: 'Rijeka',
//       naselje: '',
//       ljubimci: false,
//       dostupnoGod: true,
//       odvojenaSoba: true,
//       terasa: true,
//       ukljuceneRezije: false,
//       opis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed nunc luctus, viverra eros at, convallis lorem. Maecenas faucibus, odio ut.'
//     },
//   ],

//   gradovi: [
//     { 
//       grad: 'Bjelovar', 
//       zupanija: 1
//     },
//     { 
//       grad: 'Daruvar', 
//       zupanija: 1
//     },
//     {
//       grad: 'Nova Gradiška',
//       zupanija: 2
//     },
//     {
//       grad: 'Slavonski Brod',
//       zupanija: 2
//     },
//     {
//       grad: 'Dubrovnik',
//       zupanija: 3
//     },
//     {
//       grad: 'Korčula',
//       zupanija: 3
//     },
//     {
//       grad: 'Pula',
//       zupanija:  4
//     },
//     {
//       grad: 'Pazin',
//       zupanija: 4
//     },
//     {
//       grad: 'Poreč',
//       zupanija: 4
//     },
//     {
//       grad: 'Novigrad',
//       zupanija: 4
//     },
//     {
//       grad: 'Rovinj',
//       zupanija: 4
//     },
//     {
//       grad: 'Umag',
//       zupanija: 4
//     },
//     {
//       grad: 'Karlovac',
//       zupanija: 5
//     },
//     {
//       grad: 'Ogulin',
//       zupanija: 5
//     },
//     {
//       grad: 'Koprivnica',
//       zupanija: 6
//     },
//     {
//       grad: 'Križevci',
//       zupanija: 6
//     },
//     {
//       grad: 'Krapina',
//       zupanija: 7
//     },
//     {
//       grad: 'Gospić',
//       zupanija: 8
//     },
//     {
//       grad: 'Novalja',
//       zupanija: 8
//     },
//     {
//       grad: 'Senj',
//       zupanija: 8
//     },
//     {
//       grad: 'Čakovec',
//       zupanija: 9
//     },
//     {
//       grad: 'Đakovo',
//       zupanija: 10
//     },
//     {
//       grad: 'Našice',
//       zupanija: 10
//     },
//     {
//       grad: 'Osijek',
//       zupanija: 10
//     },
//     {
//       grad: 'Kutjevo',
//       zupanija: 11
//     },
//     {
//       grad: 'Lipik',
//       zupanija: 11
//     },
//     {
//       grad: 'Požega',
//       zupanija: 11
//     },
//     {
//       grad: 'Rijeka',
//       zupanija: 12
//     },
//     {
//       grad: 'Cres',
//       zupanija: 12
//     },
//     {
//       grad: 'Crikvenica',
//       zupanija: 12
//     },
//     {
//       grad: 'Krk',
//       zupanija: 12
//     },
//     {
//       grad: 'Mali Lošinj',
//       zupanija: 12
//     },
//     {
//       grad: 'Novi Vinodolski',
//       zupanija: 12
//     },
//     {
//       grad: 'Opatija',
//       zupanija: 12
//     },
//     {
//       grad: 'Rab',
//       zupanija: 12
//     },
//     {
//       grad: 'Kutina',
//       zupanija: 13
//     },
//     {
//       grad: 'Novska',
//       zupanija: 13
//     },
//     {
//       grad: 'Sisak',
//       zupanija: 13
//     },
//     {
//       grad: 'Petrinja',
//       zupanija: 13
//     },
//     {
//       grad: 'Hvar',
//       zupanija: 14
//     },
//     {
//       grad: 'Omiš',
//       zupanija: 14
//     },
//     {
//       grad: 'Split',
//       zupanija: 14
//     },
//     {
//       grad: 'Trogir',
//       zupanija: 14
//     },
//     {
//       grad: 'Vis',
//       zupanija: 14
//     },
//     {
//       grad: 'Varaždin',
//       zupanija: 15
//     },
//     {
//       grad: 'Slatina',
//       zupanija: 16
//     },
//     {
//       grad: 'Virovitica',
//       zupanija: 16
//     },
//     {
//       grad: 'Vukovar',
//       zupanija: 17
//     },
//     {
//       grad: 'Vinkovci',
//       zupanija: 17
//     },
//     {
//       grad: 'Zadar',
//       zupanija: 18
//     },
//     {
//       grad: 'Biograd na moru',
//       zupanija: 18
//     },
//     {
//       grad: 'Pag',
//       zupanija: 18
//     },
//     {
//       grad: 'Dugo Selo',
//       zupanija: 19
//     },
//     {
//       grad: 'Ivanić Grad',
//       zupanija: 19
//     },
//     {
//       grad: 'Samobor',
//       zupanija: 19
//     },
//     {
//       grad: 'Velika Gorica',
//       zupanija: 19
//     },
//     {
//       grad: 'Zaprešić',
//       zupanija: 19
//     },
//     {
//       grad: 'Knin',
//       zupanija: 20
//     },
//     {
//       grad: 'Šibenik',
//       zupanija: 20
//     },
//     {
//       grad: 'Zagreb',
//       zupanija: 21
//     }
    
//   ]
// }


export default store