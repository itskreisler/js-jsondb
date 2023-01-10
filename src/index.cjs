import fs from "fs";

/* It's a class that allows you to create a database using JSON files */
class JsonDb {
  #folderPath;
  /**
   * If the folder doesn't exist, create it.
   * @param folderPath - The path to the folder you want to create.
   */
  constructor(folderPath) {
    this.#folderPath = folderPath;
    this.#createFolderIfNotExists();
  }

  /**
   * If the folder path doesn't exist, create it
   */
  #createFolderIfNotExists() {
    if (!fs.existsSync(this.#folderPath)) {
      fs.mkdirSync(this.#folderPath, { recursive: true });
    }
  }

  /**
   * If the file doesn't exist, create it
   * @param fileName - The name of the file you want to create.
   */
  #createFileIfNotExists(fileName) {
    if (!fs.existsSync(`${this.#folderPath}/${fileName}`)) {
      fs.writeFileSync(`${this.#folderPath}/${fileName}`, "[]");
    }
  }

  /**
   * It adds a .json extension to the file name if it doesn't already have one.
   * @param fileName - The name of the file to be saved.
   * @returns The file name with the extension .json
   */
  #getFileName(fileName) {
    if (typeof fileName !== "string") {
      throw new Error("El nombre del archivo debe ser una cadena!")
    }
    if (!fileName.endsWith(".json")) {
      fileName += ".json";
    }
    return fileName;
  }
  /**
   * It takes a file name and an object, and inserts the object into the file
   * @param fileName - The name of the file you want to insert into.
   * @param obj - The object to be inserted into the file.
   */
  insert(fileName, obj) {
    fileName = this.#getFileName(fileName);
    this.#createFileIfNotExists(fileName);
    const data = fs.readFileSync(`${this.#folderPath}/${fileName}`);
    let array = JSON.parse(data);
    if (Array.isArray(obj)) {
      array = [...array, ...obj];
    } else {
      array.push(obj);
    }

    fs.writeFileSync(`${this.#folderPath}/${fileName}`, JSON.stringify(array));
  }
  /**
   * It reads a file, parses it into an array, and returns the array.
   * @param fileName - The name of the file you want to select from.
   * @param searchCriteria - This is a function that takes in an object and returns a boolean.
   * @returns An array of objects that match the search criteria.
   */
  select(fileName, searchCriteria) {
    fileName = this.#getFileName(fileName);
    if (!fs.existsSync(`${this.#folderPath}/${fileName}`)) {
      return [];
    }
    const data = fs.readFileSync(`${this.#folderPath}/${fileName}`);
    const array = JSON.parse(data);
    if (searchCriteria) {
      return array.filter(searchCriteria);
    } else {
      return array;
    }
  }
  /**
   * It takes a file name, a where function, and a newData function, and updates the file with the
   * newData function
   * @param fileName - The name of the file you want to update.
   * @param args - [where, newData]
   */
  update(fileName, ...args) {
    const [where, newData] = args;

    fileName = this.#getFileName(fileName);
    const filePath = `${this.#folderPath}/${fileName}`;
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath);
      let array = JSON.parse(data);
      array = array.map((element) => {
        if (
          where === null ||
          typeof where === "undefined" ||
          typeof where != "function"
        ) {
          if (typeof newData === "function") {
            return { ...element, ...newData(element) };
          }
          return { ...element, ...newData };
        }
        if (where(element)) {
          if (typeof newData === "function") {
            return { ...element, ...newData(element) };
          }
          return { ...element, ...newData };
        }
        return element;
      });
      fs.writeFileSync(filePath, JSON.stringify(array));
    }
  }
  /**
   * It deletes a file or a record from a file
   * @param fileName - The name of the file you want to delete from.
   * @param where - a function that returns true or false.
   */
  delete(fileName, where) {
    fileName = this.#getFileName(fileName);
    const filePath = `${this.#folderPath}/${fileName}`;
    if (typeof where === "undefined" && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath);
      const array = JSON.parse(data);
      const updatedArray = array.filter((element) => !where(element));
      fs.writeFileSync(filePath, JSON.stringify(updatedArray));
    }
  }
}
module.exports = JsonDb