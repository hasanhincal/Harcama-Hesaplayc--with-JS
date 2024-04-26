const harcamaInput = document.querySelector("#harcama");
const fiyatInput = document.querySelector("#fiyat");
const statusCheck = document.querySelector("#status-input");
const formBtn = document.querySelector(".ekle-btn");
const liste = document.querySelector(".liste");
const toplamBilgi = document.querySelector("#toplam-bilgi");
const selectFilter = document.querySelector("#filter-select");
const inputName = document.getElementById("ad");


//* Tarayıcı deposunda saklama;
const userName = localStorage.getItem("name")||"";
inputName.value = userName;

//* localStorag'a kullanıcının girdiği ismi saklama;
inputName.addEventListener("change",(e)=>{
  localStorage.setItem("name", e.target.value)
});

// izleme işlemleri
formBtn.addEventListener("click", addExpense);
liste.addEventListener("click", handleClick);
selectFilter.addEventListener("change", handleFilter);

// toplam durumu
let toplam = 0;

function updateToplam(fiyat) {
  toplam += Number(fiyat);
  toplamBilgi.innerText = toplam;
}

// harcama oluşturma
function addExpense(event) {
  event.preventDefault();

  // doğrulama yapma
  if (!fiyatInput.value || !harcamaInput.value) {
    alert("Formları doldurun!");
    // fonksiyonu durduruyoruz.
    return;
  }

  // div oluşturma
  const harcamaDiv = document.createElement("div");

  // class ekleme
  harcamaDiv.classList.add("harcama");
  // eger checkbox tıklandıysa bir class daha eklendi.
  if (statusCheck.checked) {
    harcamaDiv.classList.add("payed");
  }

  // içeriği ayarlama
  harcamaDiv.innerHTML = ` <h2>${harcamaInput.value} </h2>
                         <h2 id="value" >${fiyatInput.value} </h2><span>&#8378;</span>
                         <div class="buttons">
                            <img id="payment" src="image/debit-card.png" alt="" />
                            <img id="remove" src="image/delete.png" alt="" />
                         </div>`;
  // oluşan harcamayı html'ye gönderme (listeye ekleme)
  liste.appendChild(harcamaDiv);

  // toplamı güncelle
  updateToplam(fiyatInput.value);

  // formu temizleme
  harcamaInput.value = "";
  fiyatInput.value = "";
}

// listeye tıklanma olayını yönetme
function handleClick(event) {
  // tıklanılan elemanı alma
  const element = event.target;
  if (element.id === "remove") {
    // tıklanılan sil butonunun kapsayıcısını alma
    const wrapperElement = element.parentElement.parentElement;

    // silinecek elemanın fiyatını alma
    const deletedPrice = wrapperElement.querySelector("#value").innerText;

    // silinenin fiyatını toplamdan cıkarma
    updateToplam(-Number(deletedPrice));

    // kapsayıcıyı Html'den kaldırma
    wrapperElement.remove();
  }
}

// filtreleme işlemi
function handleFilter(event) {
  const items = liste.childNodes;

  items.forEach((item) => {
    switch (event.target.value) {
      case "all":
        item.style.display = "flex";
        break;

      case "payed":
        if (!item.classList.contains("payed")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;

      case "not-payed":
        if (item.classList.contains("payed")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;
        default:
          item.style.display = 'flex'
    }
  });
}
