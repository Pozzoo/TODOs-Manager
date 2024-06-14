
export function getFromDB() {
    return JSON.parse(localStorage.getItem("TODOs LISTs"));
}

export function saveToDB(lists) {
    localStorage.setItem("TODOs LISTs", JSON.stringify(lists));
}