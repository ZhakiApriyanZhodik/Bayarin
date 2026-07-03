// pulsa.js — isi pulsa & paket data

(function() {

  var providerAktif = null;
  var nominalAktif = null;

  var gridProvider = document.getElementById('grid-provider');
  var bagForm = document.getElementById('bagian-form-pulsa');
  var inputHp = document.getElementById('input-hp');
  var hpErr = document.getElementById('error-hp');

  renderProvider();

  function renderProvider() {
    var html = '';
    pulsaProvider.forEach(function(p) {
      var aktif = providerAktif && providerAktif.id === p.id;
      html += '<button data-id="' + p.id + '" class="bg-white border rounded-2xl p-4 flex flex-col items-center gap-2 hover:border-brand hover:-translate-y-0.5 active:scale-[0.97] transition ' + (aktif ? 'border-brand ring-2 ring-brand/20' : 'border-gray-200') + '">';
      html += '<span class="text-sm font-semibold">' + p.nama + '</span>';
      html += '</button>';
    });
    gridProvider.innerHTML = html;

    var btns = gridProvider.querySelectorAll('button');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function() {
        var id = this.getAttribute('data-id');
        providerAktif = pulsaProvider.filter(function(p) { return p.id === id; })[0];
        nominalAktif = null;
        renderProvider();
        bagForm.classList.remove('hidden');
        renderNominal();
        inputHp.value = '';
        hpErr.classList.add('hidden');
        inputHp.focus();
      });
    }
  }

  // deteksi provider otomatis dari nomor HP
  inputHp.addEventListener('input', function() {
    var val = this.value.trim();
    if (val.length >= 4) {
      var detected = deteksiProvider(val);
      if (detected && (!providerAktif || providerAktif.id !== detected.id)) {
        providerAktif = detected;
        nominalAktif = null;
        renderProvider();
        renderNominal();
      }
    }
  });

  // lanjut ke preview
  document.getElementById('tombol-lanjut-pulsa').addEventListener('click', function() {
    var hp = inputHp.value.trim();
    var nomErr = document.getElementById('error-nominal');

    if (!hp || !/^08\d{8,11}$/.test(hp)) {
      showError(hpErr, 'Nomor HP harus 10-13 digit, mulai dengan 08');
      return;
    }
    hpErr.classList.add('hidden');

    var detected = deteksiProvider(hp);
    if (!detected) { showError(hpErr, 'Provider tidak dikenali'); return; }

    if (!nominalAktif) {
      showError(nomErr, 'Pilih nominal pulsa');
      return;
    }
    nomErr.classList.add('hidden');

    providerAktif = detected;
    tampilPreview(hp);
  });

  document.getElementById('tombol-kembali-pulsa').addEventListener('click', function() {
    document.getElementById('bagian-form-pulsa').classList.remove('hidden');
    document.getElementById('bagian-preview-pulsa').classList.add('hidden');
  });

  function tampilPreview(hp) {
    var kartu = document.getElementById('kartu-preview');
    var html = '';
    html += barisDetail('Provider', providerAktif.nama);
    html += barisDetail('Nomor Tujuan', hp);
    html += barisDetail('Nominal', formatRp(nominalAktif));
    html += '<div class="garis-detail"></div>';
    html += barisDetail('Harga', formatRp(nominalAktif), true);
    kartu.innerHTML = html;

    document.getElementById('bagian-form-pulsa').classList.add('hidden');
    document.getElementById('bagian-preview-pulsa').classList.remove('hidden');

    document.getElementById('tombol-bayar-pulsa').onclick = function() {
      simpanRiwayat({
        id: 'TX' + Date.now(),
        kategori: 'pulsa',
        label: providerAktif.nama + ' - ' + hp,
        jumlah: nominalAktif,
        metode: 'pulsa',
        tanggal: new Date().toISOString()
      });
      kurangiSaldo(nominalAktif);
      tampilToast('Pembelian pulsa berhasil!', 'sukses');
      providerAktif = null;
      nominalAktif = null;
      window.location.href = '../index.html';
    };
  }

  function renderNominal() {
    var grid = document.getElementById('grid-nominal');
    var html = '';
    pulsaNominal.forEach(function(n) {
      var aktif = nominalAktif === n;
      html += '<button data-nom="' + n + '" class="py-2.5 rounded-lg text-sm font-medium border transition ' + (aktif ? 'border-brand bg-brand text-white' : 'border-gray-200 text-gray-700 hover:border-brand-light') + '">';
      html += formatRp(n);
      html += '</button>';
    });
    grid.innerHTML = html;

    var btns = grid.querySelectorAll('button');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function() {
        nominalAktif = Number(this.getAttribute('data-nom'));
        renderNominal();
      });
    }
  }

})();
