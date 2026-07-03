// ===== DUMMY DATA — Bayarin =====

const billData = {
  pln: {
    "123456789012": {
      name: "Budi Santoso",
      address: "Jl. Merdeka No. 10, Jakarta Selatan",
      period: "Juni 2026",
      amount: 245000,
      admin: 2500,
      dueDate: "2026-07-15",
      status: "unpaid"
    },
    "123456789013": {
      name: "Siti Rahayu",
      address: "Jl. Sudirman No. 25, Bandung",
      period: "Juni 2026",
      amount: 189000,
      admin: 2500,
      dueDate: "2026-07-12",
      status: "unpaid"
    },
    "123456789014": {
      name: "Ahmad Fauzi",
      address: "Jl. Gatot Subroto No. 8, Surabaya",
      period: "Juni 2026",
      amount: 312000,
      admin: 2500,
      dueDate: "2026-07-10",
      status: "unpaid"
    },
    "123456789015": {
      name: "Dewi Lestari",
      address: "Jl. Diponegoro No. 33, Yogyakarta",
      period: "Juni 2026",
      amount: 156000,
      admin: 2500,
      dueDate: "2026-07-18",
      status: "unpaid"
    },
    "123456789016": {
      name: "Rizki Pratama",
      address: "Jl. Ahmad Yani No. 5, Semarang",
      period: "Juni 2026",
      amount: 278000,
      admin: 2500,
      dueDate: "2026-07-20",
      status: "unpaid"
    }
  },
  pdam: {
    "PDAM001234": {
      name: "Budi Santoso",
      address: "Jl. Merdeka No. 10, Jakarta Selatan",
      period: "Juni 2026",
      amount: 85000,
      admin: 2000,
      dueDate: "2026-07-14",
      status: "unpaid"
    },
    "PDAM001235": {
      name: "Siti Rahayu",
      address: "Jl. Sudirman No. 25, Bandung",
      period: "Juni 2026",
      amount: 62000,
      admin: 2000,
      dueDate: "2026-07-16",
      status: "unpaid"
    },
    "PDAM001236": {
      name: "Ahmad Fauzi",
      address: "Jl. Gatot Subroto No. 8, Surabaya",
      period: "Juni 2026",
      amount: 94000,
      admin: 2000,
      dueDate: "2026-07-11",
      status: "unpaid"
    }
  },
  internet: {
    "INT9876543210": {
      name: "Budi Santoso",
      provider: "IndiHome",
      package: "100 Mbps",
      period: "Juni 2026",
      amount: 350000,
      admin: 2500,
      dueDate: "2026-07-20",
      status: "unpaid"
    },
    "INT9876543211": {
      name: "Siti Rahayu",
      provider: "Biznet",
      package: "75 Mbps",
      period: "Juni 2026",
      amount: 300000,
      admin: 2500,
      dueDate: "2026-07-18",
      status: "unpaid"
    },
    "INT9876543212": {
      name: "Ahmad Fauzi",
      provider: "MyRepublic",
      package: "50 Mbps",
      period: "Juni 2026",
      amount: 265000,
      admin: 2500,
      dueDate: "2026-07-15",
      status: "unpaid"
    }
  },
  seminar: {
    "SEM2026001": {
      name: "Seminar Nasional AI 2026",
      organizer: "Universitas Indonesia",
      date: "2026-08-15",
      amount: 150000,
      admin: 5000,
      dueDate: "2026-08-10",
      status: "unpaid"
    },
    "SEM2026002": {
      name: "Workshop Blockchain & Web3",
      organizer: "ITB Bandung",
      date: "2026-09-01",
      amount: 200000,
      admin: 5000,
      dueDate: "2026-08-25",
      status: "unpaid"
    },
    "SEM2026003": {
      name: "Tech Conference Jakarta 2026",
      organizer: "Kemkominfo",
      date: "2026-07-28",
      amount: 100000,
      admin: 5000,
      dueDate: "2026-07-20",
      status: "unpaid"
    }
  }
};

// ===== SPP / Cicilan Biaya Kuliah =====
const sppData = {
  "202310001": {
    name: "Zhaki Apriyan",
    program: "Teknik Informatika",
    semester: "Ganjil 2025/2026",
    installments: [
      { id: 1, desc: "SPP Semester Ganjil 2025/2026 — Cicilan ke-1", amount: 2500000, status: "paid" },
      { id: 2, desc: "SPP Semester Ganjil 2025/2026 — Cicilan ke-2", amount: 2500000, status: "paid" },
      { id: 3, desc: "SPP Semester Ganjil 2025/2026 — Cicilan ke-3", amount: 2500000, status: "unpaid" },
      { id: 4, desc: "SPP Semester Ganjil 2025/2026 — Cicilan ke-4", amount: 2500000, status: "unpaid" },
      { id: 5, desc: "SPP Semester Genap 2025/2026 — Cicilan ke-1", amount: 2500000, status: "unpaid" },
      { id: 6, desc: "SPP Semester Genap 2025/2026 — Cicilan ke-2", amount: 2500000, status: "unpaid" },
      { id: 7, desc: "SPP Semester Genap 2025/2026 — Cicilan ke-3", amount: 2500000, status: "unpaid" },
      { id: 8, desc: "SPP Semester Genap 2025/2026 — Cicilan ke-4", amount: 2500000, status: "unpaid" }
    ]
  },
  "202310002": {
    name: "Siti Rahayu",
    program: "Sistem Informasi",
    semester: "Ganjil 2025/2026",
    installments: [
      { id: 1, desc: "SPP Semester Ganjil 2025/2026 — Cicilan ke-1", amount: 2200000, status: "paid" },
      { id: 2, desc: "SPP Semester Ganjil 2025/2026 — Cicilan ke-2", amount: 2200000, status: "paid" },
      { id: 3, desc: "SPP Semester Ganjil 2025/2026 — Cicilan ke-3", amount: 2200000, status: "paid" },
      { id: 4, desc: "SPP Semester Ganjil 2025/2026 — Cicilan ke-4", amount: 2200000, status: "unpaid" },
      { id: 5, desc: "SPP Semester Genap 2025/2026 — Cicilan ke-1", amount: 2200000, status: "unpaid" },
      { id: 6, desc: "SPP Semester Genap 2025/2026 — Cicilan ke-2", amount: 2200000, status: "unpaid" }
    ]
  },
  "202310003": {
    name: "Ahmad Fauzi",
    program: "Teknik Komputer",
    semester: "Ganjil 2025/2026",
    installments: [
      { id: 1, desc: "SPP Semester Ganjil 2025/2026 — Cicilan ke-1", amount: 2800000, status: "paid" },
      { id: 2, desc: "SPP Semester Ganjil 2025/2026 — Cicilan ke-2", amount: 2800000, status: "unpaid" },
      { id: 3, desc: "SPP Semester Ganjil 2025/2026 — Cicilan ke-3", amount: 2800000, status: "unpaid" },
      { id: 4, desc: "SPP Semester Ganjil 2025/2026 — Cicilan ke-4", amount: 2800000, status: "unpaid" },
      { id: 5, desc: "SPP Semester Genap 2025/2026 — Cicilan ke-1", amount: 2800000, status: "unpaid" },
      { id: 6, desc: "SPP Semester Genap 2025/2026 — Cicilan ke-2", amount: 2800000, status: "unpaid" },
      { id: 7, desc: "SPP Semester Genap 2025/2026 — Cicilan ke-3", amount: 2800000, status: "unpaid" },
      { id: 8, desc: "SPP Semester Genap 2025/2026 — Cicilan ke-4", amount: 2800000, status: "unpaid" }
    ]
  }
};

// ===== Provider Pulsa =====
const pulsaProviders = [
  { id: "telkomsel", name: "Telkomsel", prefix: ["0811","0812","0813","0821","0822","0852","0853"] },
  { id: "xl", name: "XL Axiata", prefix: ["0817","0818","0819","0859","0877","0878"] },
  { id: "indosat", name: "Indosat Ooredoo", prefix: ["0814","0815","0816","0855","0856","0857","0858"] },
  { id: "tri", name: "Tri (3)", prefix: ["0895","0896","0897","0898","0899"] },
  { id: "smartfren", name: "Smartfren", prefix: ["0881","0882","0883","0884","0885","0886","0887","0888","0889"] },
  { id: "axis", name: "Axis", prefix: ["0831","0832","0833","0838"] }
];

const pulsaNominals = [10000, 25000, 50000, 100000, 200000];

// ===== Utility: Format Rupiah =====
function formatRupiah(num) {
  return "Rp " + num.toLocaleString("id-ID");
}

// ===== Utility: Get transactions from localStorage =====
function getTransactions() {
  try {
    return JSON.parse(localStorage.getItem("bayarin_transactions")) || [];
  } catch {
    return [];
  }
}

function saveTransaction(tx) {
  const list = getTransactions();
  list.unshift(tx);
  localStorage.setItem("bayarin_transactions", JSON.stringify(list));
}

// ===== Utility: Detect provider from phone number =====
function detectProvider(phone) {
  const prefix = phone.substring(0, 4);
  for (const p of pulsaProviders) {
    if (p.prefix.some(pr => prefix.startsWith(pr))) return p;
  }
  return null;
}
