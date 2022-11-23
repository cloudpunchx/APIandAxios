// END POINTS see notes

// Parameters I am looking for when picking an API to use
// no auth key
// yes to HTTPS secure
// COR - need allowed or unknown (unknown is possibly a yes or no so you might have to restart)

function placeholderSuccess(response){
    // console.log(`Success!`);
    // console.log(response.data);
    let data = response.data;
    for (let post of data){
        console.log(post);
        document.body.insertAdjacentHTML(`beforeend`, `<h3>${post.id}. ${post.title}</h3>`)
        document.body.insertAdjacentHTML(`beforeend`, `<p>${post.body}</p>`)
    }
} 
// the above function loops the data and inserts the data in order as we've said

function placeholderFailure(error){
    document.body.insertAdjacentHTML(`afterbegin`, `<h1>There was an error!</h1>`)
    console.log(error);
}

// you don't even have to use the word data, you could say let meal of meals or whatever
function mealSuccess(response){
    // we had to put data.meals here because it was an object holding an array so we needed to go deeper
    let data = response.data.meals;
    let resultsElement = document.getElementById(`results`);
    // we are using innerhtml to remove the last results so the search doesn't stack
    resultsElement.innerHTML = "";
    for(let meal of data){
        resultsElement.insertAdjacentHTML(`beforeend`, `<h2>${meal.strMeal}</h2>`);
        resultsElement.insertAdjacentHTML(`beforeend`, `<img src="${meal.strMealThumb}" alt="${meal.strMeal}">`)
    }
    console.log(data);
}

function mealFailure(error){
    console.log(error);
}

// I JUST COMMENTED THIS OUT SO I COULD DO THE OTHER FUNCTIONS WITH THE 2ND AXIOS REQ
// axios.request({
//     url : `https://jsonplaceholder.typicode.com/posts`
// }).then(placeholderSuccess).catch(placeholderFailure);

// make a request
// get an array
// you can see the data in the debugger with each element in this array, there's 100
// there's an ID and other stuff, just have a look

function search(){
    axios.request({
        url: `https://www.themealdb.com/api/json/v1/1/search.php`,
        params: {
            s: document.getElementById(`searchBox`).value
        }
    }).then(mealSuccess).catch(mealFailure);
}

document.getElementById(`searchSubmit`).addEventListener(`click`, search);