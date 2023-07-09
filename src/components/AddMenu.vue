<script>

import houses from '../assets/Houses.js'

export default {

    data() {
        return {
            selectedOption: '',
            selectedAnimal: '',
            searchedAnimals: [],
            newHouse: {
                name: '',
                type: '' ,
                animal: '',
                price: '',
            }
        }
    },
    methods: {
       submitForm(e) {
        e.preventDefault();
        if(this.selectedOption === 'Domek na drzewie'){
            this.newHouse.type = 'Domek na drzewie'
            this.newHouse.price += " zł"
            if(this.selectedAnimal){
                this.newHouse.animal = this.selectedAnimal;
            }
            houses.treeHouses.push({...this.newHouse})
        } else if(this.selectedOption === 'Domek na ziemii'){
            this.newHouse.type = 'Domek na ziemii'
            this.newHouse.price += " zł"
            if(this.selectedAnimal){
                this.newHouse.animal = this.selectedAnimal;
            }
            houses.groundHouses.push({...this.newHouse})
        }

        this.newHouse = {
            name: '',
            type: '',
            animal: '',
            price: '',
        }

        this.searchAnimals()

       },   

       searchAnimals(){
            if(this.selectedOption === 'Domek na drzewie'){
                const treeHouses = houses.treeHouses;
                this.searchedAnimals = Array.from( new Set(treeHouses.map((house => house.animal))))
            }else if(this.selectedOption == 'Domek na ziemii'){
                const groundHouses = houses.groundHouses;
                this.searchedAnimals = Array.from( new Set(groundHouses.map((house => house.animal))))
            }

            
        }
    },

    computed: {

        selectedHouse(){
            if(!this.selectedOption){
                return 1;
            }
        },

        selected() {
            if(this.selectedAnimal){
                return 1;
            }
        }
    },

    
       
    

    watch: {
        selectedOption() {
           this.searchAnimals()
        }
    }
    
}

</script>

<template>
    <div class="addmenu">
        <div class="form-container">
            <form @submit="submitForm">
                <div class="form-element">
                    <h2>Domek:</h2>
                    <select v-model="selectedOption">
                        <option value="">Wybierz opcję</option>
                        <option value="Domek na drzewie">Na drzewie</option>
                        <option value="Domek na ziemii">Na ziemii</option>
                    </select>
                </div>

                <div v-if="!selectedHouse">
                    <div class="form-element">
                        <h2>Nazwa:</h2>
                            <input type="text" v-model="newHouse.name" required>
                    </div>

                    <div class="form-element">
                        <h2>Zwierze:</h2>
                        <select v-model="selectedAnimal">
                            <option value="">Nowe zwierze</option>
                            <option v-for="animal in searchedAnimals" :value="animal" >{{ animal }}</option>

                        </select>
                    </div>
                
                    <div v-if="!selected" class="form-element">
                        <h2>Dodaj:</h2>
                            <input type="text" v-model="newHouse.animal" required>
                    </div>

                    <div class="form-element">
                        <h2>Cena zł:</h2>
                            <input type="number" v-model="newHouse.price" required>
                        
                    </div>
                    <div class="form-button">
                        <button type="submit">Dodaj</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
    .addmenu{
        border-radius: 5px;
        background: #3F3F3F;
        box-shadow:  20px 20px 40px #313131,
                    -20px -20px 40px #4d4d4d;
        width: 500px;
        /* height: 400px; */
        padding: 30px;
        color: #fff;
    }

    .form-container{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    .form-element{
        display: flex;
        margin: 10px 0;
    }

    .form-element h2{
        width :10vw;
    }

    .form-button{
        justify-content: flex-end;
        display: flex;
    }

    button{
        padding:  10px 40px;
        background: rgb(37, 37, 37);
        color: #fff;
        border-radius: 5px;
        border: none;
        transition: 0.3s ease;
        font-size: 1rem;
        font-weight: bold;
    }

    button:hover{
        background: rgb(19, 19, 19);
    }
</style>