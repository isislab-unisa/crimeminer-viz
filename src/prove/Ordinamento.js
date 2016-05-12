/**
 * 
 */
function mergeSort(lista){

    if(lista.length < 2)
        return lista;

    var centro = Math.floor(lista.length / 2),
        sin   = lista.slice(0, centro),
        dex   = lista.slice(centro);

    return merge(mergeSort(sin), mergeSort(dex));
}

function merge(sin, dex){
	var result  = [],
        isin    = 0,
        idex    = 0;

    while(isin < sin.length && idex < dex.length){
        if(sin[isin] < dex[idex]){
            result.push(sin[isin++]);
        } else {
            result.push(dex[idex++]);
        }
    }

    return result.concat(sin.slice(isin)).concat(dex.slice(idex));
}