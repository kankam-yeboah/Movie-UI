
//Convert the movie popularity to a percentage match for the user
export const convertToNumPerc = (str) => {
    let num = Number(str);
    return Math.floor((num/10000) *100);
}