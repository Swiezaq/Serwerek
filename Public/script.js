// Przypisujemy do naszej nazwy "guzikZamowienia" guzik z naszego HTML odpowiedzialny za wyświetlanie zamówień
const guzikZamowienia = document.getElementById('Guzik_Zamowieniaaa')

// Przedstawia zassane zamowienia z serwerka
let zamowieniaX;

// Ustawiamy event "kliknięcie" w efekcie którego wywoływana jest funkcja "PokaZamowienia()"
// (e)=> funkcja strzałkowa uruchamiająca wcześniej zdefiniowaną funkcję (inaczej anonimowa)
guzikZamowienia.addEventListener('click', (e)=>{
    PokaZamowienia()
})

// Tworzymy funkcję "PokaZamowienia", wysyła zapytanie do serwera i otrzymujemy w odpowiedzi json, 
// który zamieniany jest w obiekt (czyli zasysamy te nasze zamowienia z bazy danych)
// async - funkcja asynchroniczna,  dzięki niej zamiast iść od góry do dołu w kodzie, 
// Pozwala ona aby funkcja zaczekała, lub odczekała do czasu uzyskania odpowiedzi i dopiero śmigała dalej
async function  PokaZamowienia(){

    // Gdy się pojawi błąd, to robi to co ustawimy, czyli u nas wyświetla w konsoli "console.log(error.message)"
    try {
        // Fetch, API przeglądarkowe, które obsługuje HTTP requesty
        const response = await fetch('/zamowienia')
        // Fetch daje mi responda na serwerku js
        let zamowienia = await response.json()
        zamowieniaX = await zamowienia
        } catch (error) {
        console.log(error.message)
        }

        // Zamieniamy otrzymany obiekt na tablicę (np key to jest id formularza, np "Imie", natomiast Value, to wartość którą tam wpisano, np "Paweł")
        let zamowieniaWyswietl = [];
        for (const[key,value]of Object.entries(zamowieniaX)){
            for(const[key,value2]of Object.entries(value)){
		zamowieniaWyswietl.push(value2)
            }            
        };

        let wiersze = document.getElementById('wiersze');
        let jedenWiersz;

        // Tworzymy naszą tabelę z danymi
        for(let i = 0; i< zamowieniaWyswietl.length; i++){
            
            // Sprawiamy, aby ID było poprawnie wskazywane, dzielimy przez 13
            if(i%13===0){
                jedenWiersz = document.createElement('tr');
                let pierwszaKomorka = document.createElement('td');
                pierwszaKomorka.innerHTML = i/13;
                jedenWiersz.appendChild(pierwszaKomorka);
     
            } else if(i%13!==12){
                let jednaKomorka = document.createElement('td');
                jednaKomorka.innerHTML=zamowieniaWyswietl[i];
                jedenWiersz.appendChild(jednaKomorka);
            }else{
                wiersze.appendChild(jedenWiersz);
            }
        }
}
