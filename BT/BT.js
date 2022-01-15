// Start BT1
function layDiemKhuVucUuTien(type) {
  switch (type) {
    case "A":
      return 2;
    case "B":
      return 1;
    case "C":
      return 0.5;
    default:
      return 0;
  }
}

function layDiemDoiTuongUuTien(type) {
  switch (type) {
    case "1":
      return 2.5;
    case "2":
      return 1.5;
    case "3":
      return 1;
    default:
      return 0;
  }
}

function showMsg(mess) {
  const messEl = document.querySelector(".mess-1");
  messEl.innerHTML = mess;
}

function quanLyTuyenSinh() {
  const checkBtn = document.querySelector(".result-btn-1");
  if (checkBtn) {
    checkBtn.onclick = function (e) {
      const dcHoiDong = +document.querySelector("#dc").value;
      const scores = document.querySelectorAll(".score");
      const kvUuTien = document.querySelector("#khuVuc").value;
      const dtUuTien = document.querySelector("#doiTuong").value;

      let diemChuaUuTien = 0;

      for (let i = 0; i < scores.length; i++) {
        console.log(+scores[i].value);
        if (+scores[i].value === 0) {
          showMsg("Không trúng tuyển vì có điểm bằng 0");
          return;
        } else {
          diemChuaUuTien += +scores[i].value;
        }
      }

      const diemUuTien =
        layDiemKhuVucUuTien(kvUuTien) + layDiemDoiTuongUuTien(dtUuTien);
      const finalScore = diemChuaUuTien + diemUuTien;

      if (finalScore >= dcHoiDong) {
        showMsg("Đã trúng tuyển");
      } else {
        showMsg("Không trúng tuyển vì điểm thấp hơn điểm chuẩn");
      }
    };
  }
}

quanLyTuyenSinh();
// End BT1

// Start BT2

function getTotalPrice(kw) {
  const kw50 = kw >= 50 ? 50 : kw;
  const kw50Next = kw >= 100 ? 50 : kw - kw50;
  const kw100Next = kw >= 200 ? 100 : kw - kw50 - kw50Next;
  const kw150Next = kw >= 350 ? 150 : kw - kw50 - kw50Next - kw100Next;
  const conLai = kw - kw50 - kw50Next - kw100Next - kw150Next;

  const finalPrice =
    kw50 * 500 +
    kw50Next * 650 +
    kw100Next * 850 +
    kw150Next * 1100 +
    conLai * 1300;
  return finalPrice;
}

function getPrice() {
  const checkBtn = document.querySelector(".result-btn-2");
  if (checkBtn) {
    checkBtn.onclick = () => {
      const nameValue = document.querySelector("input[name='name']").value;
      const kwValue = +document.querySelector("input[name='kw']").value;
      const messEl = document.querySelector(".mess-2");
      const price = getTotalPrice(kwValue);

      const result =
        "Khách hàng:" +
        nameValue +
        "-Tiền điện:" +
        new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "vnd",
        }).format(price);
      messEl.innerHTML = result;
    };
  }
}

getPrice();

// End BT2

// Start BT3

function xuLyThue(thuNhap) {
  const newThuNhap = thuNhap / 1000000;
  if (newThuNhap <= 60) {
    return 0.05;
  } else if (newThuNhap > 60 && newThuNhap <= 120) {
    return 0.1;
  } else if (newThuNhap > 120 && newThuNhap <= 210) {
    return 0.15;
  } else if (newThuNhap > 210 && newThuNhap <= 384) {
    return 0.2;
  } else if (newThuNhap > 384 && newThuNhap <= 624) {
    return 0.25;
  } else if (newThuNhap > 624 && newThuNhap <= 960) {
    return 0.3;
  } else {
    return 0.35;
  }
}

function tinhThueTNCN() {
  const resultBtn = document.querySelector(".result-btn-3");
  if (resultBtn) {
    resultBtn.onclick = () => {
      const name = document.querySelector("input[name='name-3']").value;
      const thuNhap = +document.querySelector("input[name='thuNhap']").value;
      const countPerson = +document.querySelector("input[name='count']").value;
      const messEl = document.querySelector(".mess-3");

      let thuNhapChiuThue = thuNhap - 4000000 - countPerson * 1600000;
      const thue = xuLyThue(thuNhapChiuThue);
      const thuePercent = thue * 100;

      messEl.innerHTML = name + " phải chịu thuế:" + thuePercent + "%";
    };
  }
}

tinhThueTNCN();

// End BT3

// Start BT4

function loadInfo() {
  const loaiKH = document.querySelector("#doiTuong-4");
  const soKNWrap = document.querySelector(".soKNWrap");
  switch (loaiKH.value) {
    case "ND":
      soKNWrap.style.display = "none";
      break;
    case "DN":
      soKNWrap.style.display = "block";
      break;
    default:
      soKNWrap.style.display = "none";
  }
}

function showInfo() {
  const loaiKH = document.querySelector("#doiTuong-4");
  loaiKH.onchange = (e) => {
    loadInfo();
  };
}

function getPriceByType(type) {
  const countKenhCC = +document.querySelector("input[name='soKCC']").value;
  const countKN = +document.querySelector("input[name='soKN']").value;
  switch (type) {
    case "ND":
      return 4.5 + 20.5 + 7.5 * countKenhCC;
    case "DN": {
      let priceKN = 0;
      if (countKN <= 10) {
        priceKN = countKN * 7.5;
      } else {
        priceKN = 75 + (countKN - 10) * 5;
      }
      return 15 + priceKN + 50 * countKenhCC;
    }
    default:
      break;
  }
}

function getResult() {
  const resultBtn = document.querySelector(".result-btn-4");
  if (resultBtn) {
    resultBtn.onclick = () => {
      const type = document.querySelector("#doiTuong-4").value;
      const maKH = document.querySelector("input[name='maKH']").value;
      const messEl = document.querySelector(".mess-4");
      const totalPrice = getPriceByType(type);

      messEl.innerHTML =
        "Mã Khách Hàng:" + maKH + "-Giá tính tiền cáp:" + totalPrice + "$";
    };
  }
}

loadInfo();
showInfo();
getResult();

// End BT4
