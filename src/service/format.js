function addZero(obj){
    return ('0' + obj).slice(-2);
}

export function dateFormat(date){
    const year = date.getFullYear();
    const month = addZero(date.getMonth() + 1);
    const day = addZero(date.getDate());
    const hours = addZero(date.getHours());
    const minutes = addZero(date.getMinutes());
    const seconds = addZero(date.getSeconds());
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
