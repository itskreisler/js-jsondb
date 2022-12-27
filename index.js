import fs from "fs";

export default class JsonDb {
  #folderPath;
  constructor(folderPath) {
    this.#folderPath = folderPath;
    this.#createFolderIfNotExists();
  }

  #createFolderIfNotExists() {
    if (!fs.existsSync(this.#folderPath)) {
      fs.mkdirSync(this.#folderPath, { recursive: true });
    }
  }

  #createFileIfNotExists(fileName) {
    if (!fs.existsSync(`${this.#folderPath}/${fileName}`)) {
      fs.writeFileSync(`${this.#folderPath}/${fileName}`, "[]");
    }
  }

  #getFileName(fileName) {
    if (!fileName.endsWith(".json")) {
      fileName += ".json";
    }
    return fileName;
  }
  insert(fileName, object) {
    fileName = this.#getFileName(fileName);
    this.#createFileIfNotExists(fileName);
    const data = fs.readFileSync(`${this.#folderPath}/${fileName}`);
    const array = JSON.parse(data);
    array.push(object);
    fs.writeFileSync(`${this.#folderPath}/${fileName}`, JSON.stringify(array));
  }
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
          return { ...element, ...newData };
        }
        if (where(element)) {
          return { ...element, ...newData };
        }
        return element;
      });
      fs.writeFileSync(filePath, JSON.stringify(array));
    }
  }
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
