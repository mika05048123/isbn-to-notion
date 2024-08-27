function GetData(){
  url = "https://www.googleapis.com/books/v1/volumes?q=isbn:"; //ISBNの手前まで
  isbn = document.getElementById("ISBN").value;
  
  let request = new XMLHttpRequest();
  request.open('GET', url+isbn);
  request.responseType = 'json';
  request.send();
  request.onload = function() {
    const result = request.response;
    document.getElementById("title").value = result["items"][0]["volumeInfo"]["title"];
    document.getElementById("subtitle").value = result["items"][0]["volumeInfo"]["subtitle"];
    document.getElementById("authors").value = result["items"][0]["volumeInfo"]["authors"];
    document.getElementById("publishedDate").value = result["items"][0]["volumeInfo"]["publishedDate"];
    document.getElementById("pageCount").value = result["items"][0]["volumeInfo"]["pageCount"];
    document.getElementById("imagePlace").src = "https://images-na.ssl-images-amazon.com/images/P/"+toISBN10(isbn)+".09.LZZZZZZZ.jpg";
    document.getElementById("imageSrc").value = "https://images-na.ssl-images-amazon.com/images/P/"+toISBN10(isbn)+".09.LZZZZZZZ.jpg";
  }
}

const toISBN10 = (isbn13) => {
  // 1. 先頭３文字と末尾１文字を除く
  const src = isbn13.slice(3, 12);

  // 2. 先頭の桁から順に10、9、8…2を掛けて合計する
  const sum = src.split('').map(s => parseInt(s))
    .reduce((p, c, i) => (i === 1 ? p * 10 : p) + c * (10 - i));
  
  // 3. 合計を11で割った余りを11から引く（※引き算の結果が11の場合は0、10の時はアルファベットのXにする）
  const rem = 11 - sum % 11;
  const checkdigit = rem === 11 ? 0 : (rem === 10 ? 'X' : rem);
  
  // 1.の末尾に3.の値を添えて出来上がり
  return `${src}${checkdigit}`;
};
