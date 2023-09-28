import {  generateCountryRandomly } from './javaScript/api.js'
import {  generateByName } from './javaScript/api.js'
import {  generateByRegion } from './javaScript/api.js'
import { loadCountryDetailPage  } from './javaScript/api.js'

const dropdownContent = document.querySelector(".dropwdown-content")
const dropdownContentOptions = document.querySelectorAll(".dropwdown-content p")
const filter = document.querySelector(".filter-click")
const filterClick = document.querySelector(".filter-click")

const countrySearch = document.getElementById("countrySearch")

const colorScheme = document.querySelector(".color-scheme")
const colorSchemeIcon = document.querySelector(".fa-moon")
const savedColorShceme = localStorage.getItem("colorScheme")

const backButton = document.getElementById("back")

function closeFilter() {
    dropdownContent.classList.remove("active")
}

document.addEventListener("DOMContentLoaded", () => {
    if (filter) {
        filter.addEventListener("click", () => {
            dropdownContent.classList.toggle("active")
        })

        window.onscroll = closeFilter
        window.onresize = closeFilter
    }

    if (document.querySelector(".countries .grid")) {
        generateCountryRandomly("all", '.countries .grid')

        countrySearch.addEventListener("input", (event) => {
            generateByName(event.target.value, "all", '.countries .grid')

            filterClick.innerHTML = `All regions <i class="fa-solid fa-chevron-down"></i>`
        })

        dropdownContentOptions.forEach((option) => {
            option.addEventListener("click", (event) => {
                const selectedRegion = event.target.textContent

                generateByRegion(selectedRegion, '.countries .grid')
                filterClick.innerHTML = selectedRegion + `<i class="fa-solid fa-chevron-down"></i>`
            })
        })
    }

    colorScheme.addEventListener("click", () => {
        if (document.body.classList.contains("bg-mode")) {
            document.body.classList.remove("bg-mode")
            colorSchemeIcon.classList.remove("fa-solid")
            localStorage.setItem("colorScheme", "Dark Mode")
        } else {
            document.body.classList.add("bg-mode")
            colorSchemeIcon.classList.add("fa-solid")
            localStorage.setItem("colorScheme", "Light Mode")
        }
    })

    if (savedColorShceme === "Light Mode") {
        document.body.classList.add("bg-mode")
        colorSchemeIcon.classList.add("fa-solid")
    } else if (savedColorShceme === "Dark Mode") {
        document.body.classList.remove("bg-mode")
        colorSchemeIcon.classList.remove("fa-solid")
    } else {
        document.body.classList.add("bg-mode")
        colorSchemeIcon.classList.add("fa-solid")
        localStorage.setItem("colorScheme", "Light Mode")
    }
})

if (backButton) {
    window.onload = () => {
        loadCountryDetailPage('.about-country .grid')
    }

    backButton.addEventListener("click", () => {
        window.history.back()
    })
}