function abrirLinkExterno(url) {
    if (cordova && cordova.InAppBrowser) {
        cordova.InAppBrowser.open(url, '_system', 'location=yes');
    } else {
        alert('Erro: Cordova ou InAppBrowser não está disponível!');
    }
}