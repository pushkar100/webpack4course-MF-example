import '../styles/buttonCreator.css'
import { upperCase } from 'lodash-es'

/**
 * Returns a button with given text
 * @param {String} text text of the button
 * @param {String} color color of the text
 * @returns DOM element which is a button
 */
const button = (text, color) => {
    const button = document.createElement('button')
    button.classList.add('button')
    button.innerText = upperCase(text)
    button.style.color = color

    return button
}

export default button