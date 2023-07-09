<script>
import { RouterLink, RouterView } from 'vue-router';
import houses from '../assets/Houses.js'


export default {

    data(){
        return{
            inputText: '',
            houses,
            isListVisible: false,
            filteredHouses: [],
            unsortedPrices: []
        }
    },

    // watch: {
    //     inputText(newValue){
    //         this.searchHouses()
    //     }
    // },

    methods: {
        searchHouses() {
            
            this.filteredHouses.splice(0, this.filteredHouses.length);
            
            const treeCategory = this.houses.treeHouses.map((house) => {
                return house;
            })

            const groundCategory = this.houses.groundHouses.map((house) => {
                return house;
            })

            const combinedCategory = [...treeCategory, ...groundCategory];

            this.filteredHouses = combinedCategory.filter((house) => {
                const nameMatches = house.name.toLowerCase().includes(this.inputText.toLowerCase());
                const animalMatches = house.animal.toLocaleLowerCase().includes(this.inputText.toLocaleLowerCase());
                const priceMatches = house.price.toLocaleLowerCase().includes(this.inputText.toLowerCase());
                return nameMatches || animalMatches || priceMatches;
            });

            console.log(this.filteredHouses)

        },
        toggleList(){
                this.isListVisible = !this.isListVisible;
        },
        sortByLowest(){
               this.filteredHouses = this.filteredHouses.sort((a, b) => {
                    const priceA = parseFloat(a.price.replace(' zł', ''));
                    const priceB = parseFloat(b.price.replace(' zł', ''));
                return priceA - priceB;
            });

        },
        sortByHighest(){
           
                this.filteredHouses = this.filteredHouses.sort((a, b) => {
                    const priceA = parseFloat(a.price.replace(' zł', ''));
                    const priceB = parseFloat(b.price.replace(' zł', ''));
                return priceB - priceA;
            });
        },
        sortByName(){
            this.filteredHouses = this.filteredHouses.sort((a, b) => {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
             });
        },
        changeToDolar(){
            this.filteredHouses.find((house) => {
            if(house.price.includes(' zł')){
                house.price = (Math.round(parseFloat(house.price.replace(' zł', '')) / 4.06 * 100) / 100).toFixed(2) + ' $';
            }else if(house.price.includes(' $')){
                house.price = (Math.round(parseFloat(house.price.replace(' $', '')) * 4.06 * 100) / 100).toFixed(2) + ' zł';
            } 
            })
        }

    },

    computed: {
        shouldDisplayMenu() {
            return this.inputText.length === 0;
        }
    },
    watch: {
        inputText(){
            this.searchHouses()
            

            if(this.inputText.length){
                this.filteredHouses.map((house) => {
                let price = house.price;
                if (price.includes(' $')) {
                    price = (Math.round(parseFloat(price.replace(' $', '')) * 4.06 * 100) / 100).toFixed(2) + ' zł';
                }
            house.price = price;
            })
        }

           
        }
    }
    
    
}

</script>

<template>
        <div class="search-form">
            <form>
                <div>
                    <h2>Wyszukaj</h2>
                </div>
                <input v-model="inputText" type="text" />
            </form>
            </div>

            <button v-if="!shouldDisplayMenu" @click="changeToDolar" class="price-button"><h2>Przelicz ceny na dolary</h2></button>

            <div @click="toggleList" v-if="!shouldDisplayMenu" class="search-options">
                <h2>Filtry</h2>
                <div class="search-options-elements" v-if="isListVisible">
                    <h3 @click="sortByLowest">Cena - od najniższej</h3>
                    <h3 @click="sortByHighest">Cena - od najwyższej</h3>
                    <h3 @click="sortByName">Po nazwie</h3>
                </div>
            </div>

           

           
            <div v-if="shouldDisplayMenu" class="menu">
                    <RouterLink to ='/nadrzewie'>
                        <div class="img-container">
                            <img src="https://www.drawingwars.com/assets/img/cartoons/how-to-draw-a-tree-house-step-by-step/how-to-draw-a-tree-house-step-by-step_transparent.png" alt="essa"/>
                            <div class="img-container-tittle">Umieszczane na drzewie</div>
                        </div>
                    </RouterLink>
                    <RouterLink to ='/naziemii'>
                        <div class="img-container">
                            <img src="https://www.pngmart.com/files/3/Wooden-House-PNG-HD.png" alt="essa"/>
                            <div class="img-container-tittle">Montowane na ziemii</div>
                        </div>
                    </RouterLink>
                </div>

        <div class="cards">
            <div class="card" v-if="!shouldDisplayMenu" v-for="house in filteredHouses" :key="house.id">
                <div class="card-container" >
                    <div class="card-container-img">
                        <img v-if="house.type === 'Domek na drzewie'" src="https://www.drawingwars.com/assets/img/cartoons/how-to-draw-a-tree-house-step-by-step/how-to-draw-a-tree-house-step-by-step_transparent.png" alt="essa"/>
                        <img v-if="house.type === 'Domek na ziemii'" src="https://www.pngmart.com/files/3/Wooden-House-PNG-HD.png" alt="essa"/>
                    </div>
                    
                        <div class="card-container-element">
                            <h2>Nazwa:</h2>
                            <h3>{{house.name}}</h3>
                        </div>

                        <div class="card-container-element">
                            <h2>Zwierze:</h2>
                            <h3>{{house.animal}}</h3>
                        </div>

                        <div class="card-container-element">
                            <h2>Cena:</h2>
                            <h3>{{house.price}}</h3>
                        </div>
                    
                </div>
            </div>
    </div>
        
    
    <RouterView/>
</template>

<style scoped>


.search-form{
    text-align: center;
}

.price-button{
    /* padding: 15px 12px; */
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background: rgb(53, 53, 53);
    transition: 0.3s ease;
}

.price-button:hover{
    background: rgb(22, 22, 22);
}
.price-button h2{
    padding: 15px 10px;
     
}


.search-options{
    background: rgb(53, 53, 53);
    border-radius: 5px;
     position: relative;
     cursor: pointer;
     color: #fff;
     transition: 0.3s ease;
}

.search-options:hover{
    background: rgb(22, 22, 22);
}

.search-options-elements{
    padding: 10px 0;
    border-radius: 5px;
    padding-left: 15px;
    margin-top: 5px;
    position: absolute;
    z-index: 1;
    width: 100%;
    background: rgb(53, 53, 53);
}

.search-options-elements h3{
        margin-top: 8px;
        color: #fff;
        padding: 5px 0px;
        text-align: center;
        transition: 0.3s ease;
        cursor: pointer;
    }

.search-options h2{
    padding: 10px 90px;
    color: #fff;
}



.search-form h2{
    margin-bottom: 10px;
    color: #fff;
}

input{
    padding: 8px 25px;
    font-size: 1rem;
}

.search-filters{
    color: #fff;
    display: flex;
    justify-content: flex-start;
}



a{
    text-decoration: none;
}

.menu{
    padding-top: 50px;
    display: flex;
    gap: 5vh;
    justify-content: center;
    width: 100%;
}




.img-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 400px;
    /* background: rgb(39, 39, 39); */
    padding: 20px;
    border-radius: 5px;
background: #3F3F3F;
box-shadow:  20px 20px 40px #313131,
             -20px -20px 40px #4d4d4d;
}

.img-container-tittle{
    margin-top: 15px;
    font-weight: bold;
    font-size: 1.1rem;
    color: #fff;
}

img{
    width: 100%;
    border-radius: 5px;
}

.cards{
        padding: 50px 0;
        display: flex;
        flex-direction: row;
        gap: 50px;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }

.card{
        width: 300px;
        height: 360px;
        display: flex;
        flex-direction: row;
        /* align-items: center; */
        justify-content: center;
        flex-direction: column;
        border-radius: 5px;
        color: #131313;
        background: #e9e9e9;
        box-shadow:  20px 20px 40px #313131,
        -20px -20px 40px #4d4d4d;
        color: #e2e2e2;

    }

    .card-container{
       height: 90%;
       display: flex;
       flex-direction: column;
        align-items: center;
        justify-content: center;
        
    }

    .card-container h2, h3{
        color: #131313;
    }

    .card-container-element{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.card-container-element h2{
    color: #131313;
    text-align: start;
    width: 200px;
    margin-left: 10px;
}


.card-container-element h3{
    color: #131313;
    text-align: left;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.card-container-img{
        max-width: 250px;
        display: flex;
        justify-content: center;
        align-items: center;
        
    }

    .card-container-img img{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }


    

</style>