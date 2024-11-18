chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "searchImage",
        title: "Search Yandex for this image",
        contexts: ["image"]
    });
});

chrome.contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId === "searchImage") {
        const imageUrl = info.srcUrl;
    
    // Call your API with the image URL
        fetch(`https://yandex.com.tr/images-apphost/image-download?url=${encodeURIComponent(imageUrl)}&cbird=111&images_avatars_size=preview&images_avatars_namespace=images-cbir`)
          .then(response => response.json())
          .then(data => {
            const cbirId = data.cbir_id;
            const yandexSearchUrl = `https://yandex.com.tr/gorsel/search?cbir_id=${encodeURIComponent(cbirId)}&rpt=imageview&cbir_page=similar&image_url=${encodeURIComponent(imageUrl)}`;
            chrome.tabs.create({ url: yandexSearchUrl });
          }
        )
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
});
