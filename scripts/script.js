$(document).ready(function () {
  // http://127.0.0.1:3000/index.html?lang=en&nft=f4dd64ac-2c94-400e-8b31-06a2488c7a0e
  const urlParams = new URLSearchParams(window.location.search);
  const nft = urlParams.get('nft');
  if (!nft) {
    $('#_404').show();
    $('#loading').hide();
  }
  $.getJSON('https://profile.hyli.io/api/v1/nft/' + nft)
    .done(function (_data) {
      let data = _data.data;
      $('#data').fadeIn('slow');
      $('#owner').html(
        (data?.displayName ? data?.displayName + '<div class="br" />' : '') +
          ' ' +
          data.ownerName
      );
      $('#name').html(data.name);
      $('#description').html(data.description);
      $('#category').html(i18n.translate('CATEGORY.' + data.categoryId));
      $('#file').html(
        `<div class="source-area">
          <a href='${data.sourceURL}
          ' target='_blank' >${data.sourceURL}
          </a>
        </div>`
      );
      $('#source').html(
        `<div class="source-area">
          <a href='${data.sourceAddress}
          ' target='_blank' >${data.sourceAddress}
          </a>
        </div>`
      );
      $('#metadata').html(
        `<div class="source-area">
          <a href='${data.metadataAddress}
          ' target='_blank' >${data.metadataAddress}
          </a>
        </div>`
      );
      $('#collection').html(
        "<a href='https://testnet.snowtrace.dev/address/" +
          data.contractAddress +
          "' target='_blank' >" +
          data.collectionName +
          '</a>'
      );
      $('#transaction').html(
        "<a href='" +
          data.transactionAddress +
          "' target='_blank' >" +
          data.transactionAddress +
          '</a>'
      );
      $('#nft').html(data.tokenId);
      $('#date').html(new Date(data.createdDate).toLocaleString());
      $('#loading').hide();
      $('#_404').hide();
    })
    .fail(function () {
      $('#loading').hide();
      $('#_404').show();
    });
});

/*
{
  "status": "success",
  "data": {
    + "contractAddress": "0x0c44c34c37e69d2c7e012beb4379e0a71868f8cf",
    + "tokenId": 1503,
    + "name": "Notebook seçimi",
    + "description": "Notebook Seçmek için Maske'yi Dinle",
    - "ownerUserId": "e892fdf4-ba42-4997-ad42-a398c1c4360b",
    - "ownerUsername": "Hayli Test Enterprise",
    + "ownerName": "Hayli Test Enterprise",
    "creatorUserId": "e892fdf4-ba42-4997-ad42-a398c1c4360b",
    "creatorUsername": "Hayli Test Enterprise",
    "creatorName": "Hayli Test Enterprise",
    "collectionId": "4b137e31-98ae-4fd2-9b90-9909f34102ad",
    + "collectionName": "Hayli NFT Tokens |(Beta 1)",
    "thumbnailURL": "https://storage.googleapis.com/hyli-nfts/nfts/thumbnails/f4dd64ac-2c94-400e-8b31-06a2488c7a0e.jpg",
    + sourceURL": "https://storage.googleapis.com/hyli-nfts/nfts/f4dd64ac-2c94-400e-8b31-06a2488c7a0e.jpg",
    + "sourceAddress": "https://ipfs.io/ipfs/QmYoumWFByLEQyQ3cza69CtR5m7X7EuFfn48bj6Ks9znoi",
    + "metadataAddress": "https://ipfs.io/ipfs/QmZZU9vqkeXmCmQSqaF5VkLLL5y5ZstiAMhxwD8hES4kPN",
    + "transactionAddress": "https://testnet.snowtrace.dev/tx/0xbf1e90998ef1d763b693669c2ca53a1f281506337f57af4fa811974795377bb6",
    + "createdDate": 1702376120851,
    + "contentType": "IMAGE",
    + "categoryId": "OTHER",,
  }
}
*/
