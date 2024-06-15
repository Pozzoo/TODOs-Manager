
export function getFromDB() {
    return JSON.parse(localStorage.getItem("TODOs LISTs"));
}

export function saveToDB(lists) {
    if (!lists) return;
    localStorage.setItem("TODOs LISTs", JSON.stringify(lists));
}