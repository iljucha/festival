/** @typedef {(...args: any[]) => void} EventHandler */

export default class Festival {
    #eventListeners = {}

    /**
     * Creates a new Events Object
     */
    constructor() {}

    /**
     * @param {string} event 
     * @param {EventHandler} callback 
     */
    on(event, callback) {
        if (!this.#eventListeners[event]) {
            this.#eventListeners[event] = []
        }
        this.#eventListeners[event].push(callback)
    }

    /**
     * @param {string} event 
     * @param {EventHandler} callback 
     */
    off(event, callback) {
        if (this.#eventListeners[event] && this.#eventListeners[event].length) {
            this.#eventListeners[event].map((cb, index) => {
                if (cb === callback) {
                    this.#eventListeners[event].splice(index, 1)
                }
            })
        }
    }

    /**
     * @param {string} event 
     * @param  {...any: any[]} args 
     */
    trigger(event, ...args) {
        if (!this.#eventListeners[event]) {
            return
        }
        this.#eventListeners[event].map((callback) => {
            callback.call(null, ...args)
        })
    }
}