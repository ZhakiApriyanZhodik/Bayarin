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
