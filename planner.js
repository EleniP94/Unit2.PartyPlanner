/* Criteria for Workshop:
1.fetch is used correctly to GET data from API
2. fetch is used correctly to POST new party to API
3. Fetch is used correctly to DELETE party from API
4. app contains list of names, dates, times, etc of all parties
5. each party has working delete button
6. contains form that allows user to enter info about a party and add it to the list
7. DOM is dynamically rendered according to data stored in state
8. data stored in state is updated to stay in sync with API
*/

//connect js to API 
const API_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/events';
//I thought I linked this correctly but its not loading super well. Not sure if linked this incorrectly or if I messed up somewhere below :((( will go over with learning teams tomorrow :,(


const state = {
    party: []
}


const partyList = document.querySelector('#party');

const addPartyForm = document.querySelector('#addParty');
addPartyForm.addEventListener('submit', createParty);

//syn state with API & rerender
async function render() {
    await getParty() 
    renderParty()
}
render()

//update state with parties from API
async function getParty() {
    try {
        //fetch party info
        const response = await fetch(API_URL)
        //parse response - translate json into js obj
        const json = await response.json()
        //update party array
        state.party = json.data
        console.log(state.party)
    } catch(error) {
        console.error(error)
    }  
}

//ask API to creat new party and rerender

//@param {Event} event

async function createParty(event) {
    event.preventDefauls()

    const name = addPartyForm.insertAdjacentElement.value
    const description = addPartyForm.instrucions.value
    const date = addPartyForm.data.value
    const location = addPartyForm.description.value

    try { 
        //post event info
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, description, date, location})
        })
        //parse response
        const json = await response.json()
        //rerender the page (which will update party array)
        render()

    } catch(error) {
        console.error(error)
    }
}

// Ask API to update existing event and rerender (not currently used in app but here in code)
//@param {number} id //id of event
//@param {string} name //name of event (not sure why it is deprecated or how to fix it :( )
//@param {string} description // description of event
//@param {string} date //date of event
//@param {string} location //location of event

async function updateParty(id, name, description, date, location) {
    //add HTML to provide user a form where they canb edit an existing recipe and send a PUT requestto API
    //... this may be above my skillset for the time being 
}

//Ask API to delete and rerender event 
//@param {number} id 

async function deleteEvent(id) {
    try {
        //make delete request
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        })
        //we can parse response, and do things with response
        //rerender everything
        render()
    } catch(error) {
        console.error(error)
    }
}

function renderParty() {
    if(state.party.length < 1) {
        const newListItem = document.createElement("li")
        newListItem.textContent = "No Event Found"
        partyList.append(newListItem)
    }
    else{
        partyList.replaceChildren() // should empty partyList element

        //for each party object
        state.party.forEach((partyObj) => {
            //create list
            const newListItem = document.createElement("li")
            newListItem.classList.add("Party")
            
            //with heading, image, info
            const newHeading = document.createElement("h2")
            newHeading.textContent = partyObj.name
            const newImage = document.createElement("img")
            newImage.src = partyObj.imageUrl
            const newParagraph = document.createElement("p")
            newParagraph.textContent = partyObj.description
            //I know I need to put in space for the location and date, but im not sure if I need to remove the image part of the code
            //im afraid if I remove the image i wont know what to replace it with. I feel like for 
            //location and date I would need to enter as "p" but im afraid since newParagraph is being used that it will override or break the site 

            const deleteButton = document.createElement("button")
            deleteButton.textContent = "Delete"
            deleteButton.addEventListener("click", () => deleteParty(partyObj.id))

            newListItem.append(newHeading, newImage, newParagraph, deleteButton)
            partyList.append(newListItem)
        })
    }
}