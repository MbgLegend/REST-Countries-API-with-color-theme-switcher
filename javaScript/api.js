const countrySearch = document.getElementById("countrySearch")
const countryAPI = "https://mbglegend.github.io/Country-API/data.json"

const filterClick = document.querySelector(".filter-click")

export async function generateCountryRandomly(amount, container) {
    const countryContainer = document.querySelector(container)
    countryContainer.innerHTML = ""

    const response = await fetch(countryAPI)
    const data = await response.json()

    if (amount === "all") {
        amount = data.length
    }

    for (let i = 0; i < amount; i++) {
        const country = data[i]

        const box = document.createElement("div")
        box.classList.add("box")
        box.innerHTML = generateContent(country)
        countryContainer.appendChild(box)

        countryClickEvent(box, country)
    }
}

export async function generateByName(name, amount, container) {
    const countryContainer = document.querySelector(container)
    countryContainer.innerHTML = ""

    const response = await fetch(countryAPI)
    const data = await response.json()

    const searchText = name.toLowerCase()

    const filteredCountries = data.filter((countryData) =>
      countryData.name.toLowerCase().includes(searchText)
    )

    if (amount === "all") {
        amount = filteredCountries.length
    }

    if (name.length === 0 || name.trim() === "") {
        generateCountryRandomly("all", container)
    } else if (filteredCountries.length > 0) {
        for (let i = 0; i < amount; i++) {
            const country = filteredCountries[i]

            const box = document.createElement("div")
            box.classList.add("box")
            box.innerHTML = generateContent(country)
            
            countryClickEvent(box, country)

            countryContainer.appendChild(box)
        }
    } else {
        countryContainer.innerHTML = "<p>No country found!</p>"
    }
}

export async function generateByRegion(region, container) {
    if (region === "All regions") {
        generateCountryRandomly("all", container)
    }

    const countryContainer = document.querySelector(container)
    countryContainer.innerHTML = ""

    const response = await fetch(countryAPI)
    const data = await response.json()

    const filteredCountries = data.filter((countryData) => countryData.region === region)

    filteredCountries.forEach((country) => {
        const box = document.createElement("div")
        box.classList.add("box")
        box.innerHTML = generateContent(country)

        countryClickEvent(box, country)

        countryContainer.appendChild(box)
    })
}

export async function loadCountryDetailPage(container) {
    const aboutContainer = document.querySelector(container)
    const country = sessionStorage.getItem("Country")

    const response = await fetch(countryAPI)
    const data = await response.json()
    
    const countryData = data.filter((countryData) => countryData.name === country)

    const results = countryData[0]

    let borders = ""
    let currencies = ""
    let langauges = ""

    if (results.currencies) {
        if (results.borders.length > 1) {
            currencies = results.currencies.map(currency => currency.name).join(", ")
        } else {
            currencies = `${country}`
        }
    } else {
        currencies = "No currency"
    }

     if (results.langauges) {
        if (results.langauges.length > 1) {
            langauges = results.langauges.map(langauges => langauges.name).join(", ")
        } else {
            langauges = `${langauges}`
        }
    } else {
        langauges = "No langauges"
    }

    if (results.borders) {
        if (results.borders.length > 1) {
            borders = results.borders.map(country => `<span>${country}</span>`).join("")
        } else {
            borders = `<span>${country}</span>`
        }
    } else {
        borders = "<span>No country near border</span>"
    }

    aboutContainer.innerHTML = `
        <img src="${results.flags.svg}">
        <div class="text">
            <h1>${results.name}</h1>
            <div class="info">
                <div>
                    <div>
                        <p>
                            <b>Native Name:</b> ${results.nativeName}
                        </p>
                        <p>
                            <b>Population:</b> ${results.population.toLocaleString()}
                        </p>
                        <p>
                            <b>Region:</b> ${results.region}
                        </p>
                        <p>
                            <b>Sub Region:</b> ${results.subregion}
                        </p>
                        <p>
                            <b>Capital:</b> ${results.capital}
                        </p>
                    </div>
                </div>
                <div>
                    <div>   
                        <p>
                            <b>Top Level Domain:</b> ${results.topLevelDomain[0]}
                        </p>
                        <p>
                            <b>Currencies:</b> ${currencies}
                        </p>
                        <p>
                            <b>Languages:</b> ${langauges}
                        </p>
                    </div>
                </div>
            </div>

            <p>Border Countries:<br>
                ${borders}
            </p>
        </div>
    `
}

function generateContent(data) {
    const HTML = `
        <img src="${data.flags.png}" alt="${data.name}">
        <div class="text">
            <h1>${data.name}</h1>
            <ul>
                <li><b>Population:</b>${data.population.toLocaleString()}</li>
                <li><b>Region:</b>${data.region}</li>
                <li><b>Capital:</b>${data.capital}</li>
            </ul>
        </div>
    `
    return HTML
}

function countryClickEvent(element, country) {
    element.addEventListener("click", () => {
        navigateToDetailPage(country.name)
    })
}

function navigateToDetailPage(country) {
    countrySearch.value = ""
    generateCountryRandomly("all", '.countries .grid')
    filterClick.innerHTML = `All regions <i class="fa-solid fa-chevron-down"></i>`
    sessionStorage.setItem("Country", country)

    window.location.href = "HTML/country.html"
}
