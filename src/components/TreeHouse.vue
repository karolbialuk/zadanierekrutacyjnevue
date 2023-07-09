<script>
    import houses from '../assets/Houses.js'

    export default {
        computed: {
            treeHouses() {
                return this.houses.treeHouses;      
            },
            uniqueAnimals() {
                return [... new Set(this.treeHouses.map((house) => house.animal))]
            },
            filteredAnimalsHouses(){
                return this.treeHouses.filter((house) => house.animal === this.selectedAnimal)
            }
        },

        data() {
            return {
                houses,
                isListVisible: false,
                isListVisible2: false,
                originalPrices: [],
                selectedAnimal: "Wiewiórka",
            }
        },
        

        methods: {
            toggleList(){
                this.isListVisible = !this.isListVisible;
            },

            setSelectedAnimal(animal){
                this.selectedAnimal = animal;
            },
            toggleList2() {
                this.isListVisible2 = !this.isListVisible2;
            },
            sortByLowest(){
                this.treeHouses = this.treeHouses.sort((a,b) => {
                    const priceA = parseFloat(a.price.replace(' zł' , ''))
                    const priceB = parseFloat(b.price.replace(' zł' , ''))
                    return priceA - priceB
                })
            },
            sortByHighest(){
                this.treeHouses = this.treeHouses.sort((a,b) => {
                    const priceA = parseFloat(a.price.replace(' zł', ''))
                    const priceB = parseFloat(b.price.replace(' zł', ''))
                    return priceB - priceA;
                })
            },
            sortByName(){
            this.treeHouses = this.treeHouses.sort((a, b) => {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
             });
            },
            changeToDolar(){
                this.treeHouses = this.treeHouses.map((house) => {
                let price = house.price;

                if (price.includes(' zł')) {
                    price = (Math.round(parseFloat(price.replace(' zł', '')) / 4.06 * 100) / 100).toFixed(2) + ' $';
                } else if (price.includes(' $')) {
                    price = (Math.round(parseFloat(price.replace(' $', '')) * 4.06 * 100) / 100).toFixed(2) + ' zł';
                }

                house.price = price; 
                return house;
                });
                
         },
    },
    mounted(){
        this.treeHouses = this.treeHouses.map((house) => {
            let price = house.price;
            if (price.includes(' $')) {
                price = (Math.round(parseFloat(price.replace(' $', '')) * 4.06 * 100) / 100).toFixed(2) + ' zł';
            }
            house.price = price;
        })
    }
}

    
</script>

<template>
    <div @click="toggleList" class="options">
        <h2>Kategorie</h2>
        <div class="options-elements" v-if="isListVisible">
            <h3 @click="setSelectedAnimal(animal)" v-for="animal in uniqueAnimals">
                {{animal}}
            </h3>
        </div>
    </div>

    <button @click="changeToDolar" class="price-button"><h2>Przelicz ceny na dolary</h2></button>

    <div @click="toggleList2" class="tree-options">
        <h2>Filtry</h2>
        <div class="tree-options-elements" v-if="isListVisible2">
            <h3 @click="sortByLowest">Cena - od najniższej</h3>
            <h3 @click="sortByHighest">Cena - od najwyższej</h3>
            <h3 @click="sortByName">Po nazwie</h3>
        </div>
    </div>

    

    <div class="cards">
        <div class="card" v-for="house in filteredAnimalsHouses" :key="house.name">
            <div class="card-container" >
                <div class="card-container-img">
                    <img v-if="house.type === 'Domek na drzewie'" src="https://www.drawingwars.com/assets/img/cartoons/how-to-draw-a-tree-house-step-by-step/how-to-draw-a-tree-house-step-by-step_transparent.png" alt="essa"/>
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
</template>

<style scoped>

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

.options{
        background: rgb(53, 53, 53);
        /* padding: 10px; */
        border-radius: 5px;
        position: relative;
        cursor: pointer;
        transition: 0.3s ease;
    }
    .options:hover{
        background: rgb(22, 22, 22);
    }
    .options h2{
        color: #fff;
        padding: 10px;
    }

    .price-container{
        display: flex;
        gap: 15px;
    }

    .options-elements{
        padding: 5px 0;
        border-radius: 5px;
        margin-top: 5px;
        position: absolute;
        z-index: 1;
        width: 100%;
        background: rgb(53, 53, 53);
        
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

    .tree-options{
        background: rgb(53, 53, 53);
        border-radius: 5px;
        position: relative;
        cursor: pointer;
        color: #fff;
        transition: 0.3s ease;
    }

    .tree-options:hover{
        background: rgb(22, 22, 22);
    }
    

    .tree-options-elements{
        padding: 10px 0;
        border-radius: 5px;
        margin-top: 5px;
        position: absolute;
        width: 100%;
        background: rgb(53, 53, 53);
    }

    .tree-options-elements h3{
        margin-top: 8px;
        color: #fff;
        padding: 5px 0px;
        text-align: center;
        transition: 0.3s ease;
        cursor: pointer;
    }
    .tree-options-elements h3:hover{
        background: rgb(87, 86, 86);
    }

    .tree-options h2{
        padding: 10px 90px;
        color: #fff;
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

    .options-elements h3{
        margin-top: 8px;
        color: #fff;
        padding: 5px 10px;
        text-align: center;
        transition: 0.3s ease;
        cursor: pointer;
    }

    .options-elements h3:hover{
        background: rgb(87, 86, 86);
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

    .card-container h2{
        color: #131313;
    }

</style>