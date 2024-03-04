let myLeads = []
let oldLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") ) // checking if there are any leads in the local storage and then parse them to receive them as an array not a string 
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {      // test for truthy or falsy in the local storage. If the storage it falsy, console will log null
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

const tabs = [
    {url: "https://www.linkedin.com/in/per-harald-borgen/"}
]

//  Listen for click and Log out URL to the console
tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){   // function allows us to save url/tabs as leads
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

// refactored code due to its lack of reusability 
// it needs to render out whatever array we tell it to render out. To do that we need to pass in a variable as an argument when we call it.
function render(leads) {   // this function can now render out any lead. You can use this code to render out names etc.
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
        <li>
            <a target='_blank' href='${leads[i]}'>    
                ${leads[i]}
            </a>
        </li>
    `
        // "<li>" + myLeads[i] + "</li>" // "<li><a target='_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>"
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {  //when double clicking the delete button the local storage and my leads array are cleared.
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )  //setting 'myLeads' as the items being stored. Also changing the array into strings
    inputEl.value = ""
    render(myLeads)
})




