// spp.js — biaya kuliah / cicilan SPP

(function() {

  var nimInput = document.getElementById('input-nim');
  var nimErr = document.getElementById('error-nim');
  var tombolNim = document.getElementById('tombol-cek-nim');
  var hasilSpp = document.getElementById('hasil-spp');

  // cek NIM
  tombolNim.addEventListener('click', function() {
    var nim = nimInput.value.trim();
    if (!nim) { showError(nimErr, 'NIM tidak boleh kosong'); return; }
    if (!/^\d{9,12}$/.test(nim)) { showError(nimErr, 'NIM harus 9-12 digit angka'); return; }

    var data = sppData[nim];
    if (!data) { showError(nimErr, 'NIM tidak terdaftar'); return; }
    nimErr.classList.add('hidden');

    renderTabelSPP(nim, data);
  });

  nimInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') tombolNim.click();
  });

  function renderTabelSPP(nim, data) {
    hasilSpp.classList.remove('hidden');

    var html = '<div class="bg-white border border-gray-200 rounded-2xl p-5">';
    html += '<div class="flex items-center gap-3 mb-4">';
    html += '<div class="w-10 h-10 rounded-lg bg-cyan-50 flex items-center justify-center"><i class="fa-solid fa-user-graduate text-cyan-700"></i></div>';
    html += '<div><h3 class="text-base font-semibold">' + data.nama + '</h3>';
    html += '<p class="text-xs text-gray-500">' + data.prodi + ' - ' + data.semester + '</p></div></div>';

    html += '<div class="overflow-x-auto"><table class="w-full text-sm">';
    html += '<thead><tr class="border-b border-gray-100 text-left text-gray-500">';
    html += '<th class="py-2 pr-2 font-medium">No</th>';
    html += '<th class="py-2 px-2 font-medium">Deskripsi</th>';
    html += '<th class="py-2 px-2 font-medium text-right">Jumlah</th>';
    html += '<th class="py-2 px-2 font-medium text-center">Status</th>';
    html += '<th class="py-2 pl-2 font-medium text-center">Pilih</th>';
    html += '</tr></thead><tbody>';

    data.cicilan.forEach(function(item) {
      var badgeCls = item.status === 'lunas' ? 'badge-lunas lunas' : 'badge-lunas belum';
      var statusTxt = item.status === 'lunas' ? 'Lunas' : 'Belum Lunas';
      var disabled = item.status === 'lunas' ? ' disabled' : '';

      html += '<tr class="border-b border-gray-50">';
      html += '<td class="py-2.5 pr-2 text-gray-500">' + item.id + '</td>';
      html += '<td class="py-2.5 px-2">' + item.desc + '</td>';
      html += '<td class="py-2.5 px-2 text-right font-medium">' + formatRp(item.jumlah) + '</td>';
      html += '<td class="py-2.5 px-2 text-center"><span class="' + badgeCls + '">' + statusTxt + '</span></td>';
      html += '<td class="py-2.5 pl-2 text-center"><input type="checkbox" class="spp-cb accent-[#004643] w-4 h-4" data-jumlah="' + item.jumlah + '" data-id="' + item.id + '" data-desc="' + item.desc + '"' + disabled + '></td>';
      html += '</tr>';
    });

    html += '</tbody></table></div>';
    html += '<div class="mt-4 flex items-center justify-between">';
    html += '<div><span class="text-xs text-gray-500">Total Terpilih:</span>';
    html += '<p class="text-lg font-bold text-brand" id="total-spp">Rp 0</p></div>';
    html += '<button id="tombol-bayar-spp" class="bg-aksen text-gray-900 px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-aksen-hover active:scale-[0.98] transition">Bayar Cicilan</button>';
    html += '</div></div>';

    hasilSpp.innerHTML = html;

    // event checkbox
    var checkboxes = document.querySelectorAll('.spp-cb');
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].addEventListener('change', hitungTotal);
    }

    // event bayar
    document.getElementById('tombol-bayar-spp').addEventListener('click', function() {
      bayarSPP(nim, data);
    });
  }

  function hitungTotal() {
    var total = 0;
    var cbs = document.querySelectorAll('.spp-cb:checked');
    for (var i = 0; i < cbs.length; i++) {
      total += Number(cbs[i].getAttribute('data-jumlah'));
    }
    document.getElementById('total-spp').textContent = formatRp(total);
  }

  function bayarSPP(nim, data) {
    var cbs = document.querySelectorAll('.spp-cb:checked');
    if (cbs.length === 0) { tampilToast('Pilih cicilan yang akan dibayar', 'gagal'); return; }

    for (var i = 0; i < cbs.length; i++) {
      var cb = cbs[i];
      var id = Number(cb.getAttribute('data-id'));
      var desc = cb.getAttribute('data-desc');
      var jumlah = Number(cb.getAttribute('data-jumlah'));

      // update status
      for (var j = 0; j < data.cicilan.length; j++) {
        if (data.cicilan[j].id === id) {
          data.cicilan[j].status = 'lunas';
          break;
        }
      }

      simpanRiwayat({
        id: 'TX' + Date.now() + Math.random().toString(36).slice(2, 5),
        kategori: 'spp',
        label: desc,
        jumlah: jumlah,
        metode: 'spp',
        tanggal: new Date().toISOString()
      });
    }

    tampilToast('Pembayaran cicilan berhasil!', 'sukses');
    renderTabelSPP(nim, data);
  }

  // === KODE TAGIHAN ===
  var kodeInput = document.getElementById('input-kode');
  var kodeErr = document.getElementById('error-kode');
  var tombolKode = document.getElementById('tombol-cek-kode');
  var hasilKode = document.getElementById('hasil-kode');

  tombolKode.addEventListener('click', function() {
    var kode = kodeInput.value.trim();
    if (!kode) { showError(kodeErr, 'Kode tagihan tidak boleh kosong'); return; }
    if (kode.length < 10) { showError(kodeErr, 'Kode tagihan tidak valid'); return; }

    var data = kodeTagihanData[kode];
    if (!data) { showError(kodeErr, 'Kode tagihan tidak ditemukan'); return; }
    kodeErr.classList.add('hidden');

    var badgeCls = data.status === 'lunas' ? 'badge-lunas lunas' : 'badge-lunas belum';
    var statusTxt = data.status === 'lunas' ? 'Lunas' : 'Belum Lunas';

    var html = '<div class="bg-white border border-gray-200 rounded-2xl p-5">';
    html += '<h3 class="text-base font-semibold mb-4">Detail Tagihan</h3>';
    html += '<div class="flex flex-col gap-3 text-sm">';
    html += barisDetail('Kode Tagihan', kode);
    html += barisDetail('Nama', data.nama);
    html += barisDetail('Tagihan', data.desc);
    html += barisDetail('Semester', data.semester);
    html += barisDetail('Jumlah', formatRp(data.jumlah));
    html += barisDetail('Status', '<span class="' + badgeCls + '">' + statusTxt + '</span>');
    html += '</div>';

    if (data.status !== 'lunas') {
      html += '<button class="bayar-kode-btn mt-4 w-full bg-aksen text-gray-900 py-2.5 rounded-lg text-sm font-bold hover:bg-aksen-hover active:scale-[0.98] transition" data-kode="' + kode + '">Bayar Tagihan</button>';
    }
    html += '</div>';

    hasilKode.classList.remove('hidden');
    hasilKode.innerHTML = html;

    var btn = document.querySelector('.bayar-kode-btn');
    if (btn) {
      btn.addEventListener('click', function() {
        bayarKodeTagihan(this.getAttribute('data-kode'));
      });
    }
  });

  kodeInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') tombolKode.click();
  });

  function bayarKodeTagihan(kode) {
    var data = kodeTagihanData[kode];
    if (!data || data.status === 'lunas') return;

    data.status = 'lunas';
    simpanRiwayat({
      id: 'TX' + Date.now(),
      kategori: 'spp',
      label: data.desc + ' - ' + data.nama,
      jumlah: data.jumlah,
      metode: 'spp',
      tanggal: new Date().toISOString()
    });

    tampilToast('Pembayaran berhasil!', 'sukses');
    kodeInput.value = kode;
    tombolKode.click();
  }

})();
