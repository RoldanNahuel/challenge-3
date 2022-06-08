const fs = require('fs')

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName
    }

    async save(product) {
        try {
            const content = await this.getAll()
            const newId = content.length === 0 ? 1 : content[content.length - 1].id + 1
            const newElement = product
            newElement.id = newId
            content.push(newElement)
            const contentFile = JSON.stringify(content, null, 3)
            await fs.promises.writeFile(this.fileName, contentFile)
            return newId
        } catch (error) {
            return error
        }
    }

    async getById(id) {
        try {
            const content = await this.getAll()
            const [elementFound] = content.filter(element => element.id === id)
            return elementFound
        } catch (error) {
            return error
        }
    }

    async getAll() {
        try {
            if(!fs.existsSync(this.fileName)) {
                const contentFile = []
                await fs.promises.writeFile(this.fileName, JSON.stringify(contentFile))
            }
            const data = await fs.promises.readFile(this.fileName)
            const content = JSON.parse(data)
            return content
        } catch (error) {
            return error
        }
    }

    async deleteById(id) {
        try {
            const content = await this.getAll()
            const elementsWithoutDeletedElement = content.filter(element => element.id !== id)
            const contentFile = JSON.stringify(elementsWithoutDeletedElement, null, 3)
            await fs.promises.writeFile(this.fileName, contentFile)
        } catch (error) {
            return error
        }
    }

    async deleteAll() {
        try {
            const content = []
            await fs.promises.writeFile(this.fileName, JSON.stringify(content))
        } catch (error) {
            return error
        }
    }
}

module.exports = Contenedor